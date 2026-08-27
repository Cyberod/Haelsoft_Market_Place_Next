'use client';

import { useState, useEffect } from 'react';
import LessonPlayer from './LessonPlayer';
import { readStoredUser, authedFetch } from '@/lib/auth-client';

const StarFilled = '/star2.svg';
const StarEmpty = '/star.svg';
const BeginnerIcon = '/beginner.svg';
const ClockIcon = '/clock_bold.svg';
const HexagonIcon = '/hexagon.svg';
const MoneyIcon = '/moneys.svg';

function formatMinutes(mins) {
  if (!mins) return '';
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h} hr ${m} min` : `${h} hr`;
}

function sectionTotalMinutes(lessons = []) {
  return lessons.reduce((acc, l) => acc + (l.duration_minutes || 0), 0);
}

function renderStars(rating) {
  return [...Array(5)].map((_, i) => (
    <img key={i} src={i < Math.floor(rating) ? StarFilled : StarEmpty} alt="" className="w-4 h-4" />
  ));
}

function getInitials(name = '') {
  return name.trim().split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

export default function CourseDetail({ course, slug }) {

  const [activeTab, setActiveTab]               = useState('overview');
  const [expandedSections, setExpandedSections] = useState({});
  const [activeLesson, setActiveLesson]         = useState(null);

  // Enrollment state
  const [enrolled, setEnrolled]               = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(false);
  const [enrolling, setEnrolling]             = useState(false);
  const [enrollError, setEnrollError]         = useState('');
  const [enrollSuccess, setEnrollSuccess]     = useState(false);

  // Lesson player state
  const [lessonLoading, setLessonLoading]     = useState(false);
  const [lessonError, setLessonError]         = useState('');

  // localStorage is unreadable on the server, so auth-dependent UI resolves
  // after mount. Until then the CTA renders its signed-out form.
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => { setCurrentUser(readStoredUser()); }, []);
  const isStudent = currentUser?.role === 'student';


  // Check enrollment status once course is loaded and user is a logged-in student.
  useEffect(() => {
    if (!isStudent || !slug) return;
    let cancelled = false;
    setCheckingEnrollment(true);
    authedFetch(`/enrollments/check/${slug}/`)
      .then((res) => {
        if (!cancelled) setEnrolled(Boolean(res.enrolled));
      })
      .catch(() => {}) // Fail silently — button defaults to "Enroll"
      .finally(() => {
        if (!cancelled) setCheckingEnrollment(false);
      });
    return () => { cancelled = true; };
  }, [slug, isStudent]);

  const handleFreeEnroll = async () => {
    setEnrolling(true);
    setEnrollError('');
    try {
      await authedFetch('/enrollments/enroll/', {
        method: 'POST',
        body: JSON.stringify({ course_slug: slug }),
      });
      setEnrolled(true);
      setEnrollSuccess(true);
    } catch (err) {
      setEnrollError(err.message || 'Enrollment failed. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const handleLessonClick = async (lesson) => {
    setLessonError('');
    setActiveTab('syllabus');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Free-preview: content is already embedded in the public course response
    if (lesson.is_free_preview) {
      setActiveLesson(lesson);
      return;
    }

    // Non-preview: must be enrolled — fetch full content from the gated endpoint
    if (!enrolled) return;

    setActiveLesson(null);
    setLessonLoading(true);
    try {
      const res = await authedFetch(`/courses/public/${slug}/lessons/${lesson.id}/`);
      setActiveLesson(res.lesson ?? res);
    } catch {
      setLessonError('Failed to load lesson content. Please try again.');
    } finally {
      setLessonLoading(false);
    }
  };

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const rating       = Number(course.average_rating) || 0;
  const price        = Number(course.price);
  const discountPrice = Number(course.discount_price) || 0;
  const isFree       = price === 0;
  const discountPct  = discountPrice > price && price > 0
    ? Math.round((1 - price / discountPrice) * 100)
    : 0;

  const allLessons = (course.sections || []).flatMap((s) => s.lessons || []);
  // Enrolled students can start any video; others are limited to free-preview videos
  const firstFreeVideo = enrolled
    ? allLessons.find((l) => l.lesson_type === 'video')
    : allLessons.find(
        (l) => l.is_free_preview && l.lesson_type === 'video' && (l.video_url || l.video_file_url)
      );

  return (
    <div className="min-h-screen">

      <div className="bg-[#FCFAFA] font-inter">
        {/* Breadcrumb */}
        <div className="py-6 frame">
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <a href="/" className="text-haelsoft-primary hover:underline">Home</a>
            <span className="text-haelsoft-primary">/</span>
            <a href="/marketplace" className="text-haelsoft-primary hover:underline">Marketplace</a>
            <span className="text-haelsoft-primary">/</span>
            <span className="text-inactive truncate max-w-[200px]">{course.title}</span>
          </div>
        </div>

        <div className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-inter frame">

            {/* ── Left column ── */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">{course.title}</h1>
              {course.short_description && (
                <p className="text-inactive text-base mb-4">{course.short_description}</p>
              )}

              {/* Rating + Share */}
              <div className="flex items-center lg:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">{renderStars(rating)}</div>
                  <span className="text-black font-semibold text-sm">
                    {rating.toFixed(1)} ({course.total_reviews} {course.total_reviews === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
                <button
                  onClick={() => navigator.share?.({ title: course.title, url: window.location.href })}
                  className="flex items-center gap-2 hover:opacity-80 bg-[#EFEFEF] px-4 py-3 cursor-pointer rounded-lg"
                >
                  <img src="/share.svg" alt="Share" className="w-5 h-5" />
                  <span className="text-sm font-medium text-inactive">Share</span>
                </button>
              </div>

              {/* ── Video / preview area ── */}
              {lessonLoading ? (
                <div className="aspect-video w-full rounded-2xl bg-gray-50 border border-grey flex flex-col items-center justify-center gap-3 mb-8">
                  <div className="w-10 h-10 border-4 border-haelsoft-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-inactive">Loading lesson…</p>
                </div>
              ) : lessonError ? (
                <div className="aspect-video w-full rounded-2xl bg-red-50 border border-red-200 flex flex-col items-center justify-center gap-3 mb-8 px-6 text-center">
                  <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                  <p className="text-red-600 text-sm font-medium">{lessonError}</p>
                  <button
                    onClick={() => setLessonError('')}
                    className="text-xs text-haelsoft-primary font-semibold hover:underline"
                  >
                    Dismiss
                  </button>
                </div>
              ) : activeLesson ? (
                <div className="mb-8">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-700">
                      Now playing: <span className="text-haelsoft-primary">{activeLesson.title}</span>
                    </p>
                    <button
                      onClick={() => setActiveLesson(null)}
                      className="text-xs text-gray-400 hover:text-gray-700 underline"
                    >
                      {enrolled ? 'Back to course' : 'Back to preview'}
                    </button>
                  </div>
                  <LessonPlayer lesson={activeLesson} />
                </div>
              ) : (
                <div className="relative w-full rounded-2xl overflow-hidden mb-8 aspect-video bg-gradient-to-br from-[#FFF0EB] to-[#FEF7FF]">
                  {course.thumbnail_url ? (
                    <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-haelsoft-primary opacity-20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                      </svg>
                    </div>
                  )}
                  {firstFreeVideo && (
                    <button
                      onClick={() => handleLessonClick(firstFreeVideo)}
                      className="absolute inset-0 flex items-center justify-center hover:bg-black/20 transition-colors group"
                    >
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <svg className="w-8 h-8 text-haelsoft-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">
                        {enrolled ? 'Start Learning' : 'Click to watch preview'}
                      </div>
                    </button>
                  )}
                </div>
              )}

              {/* ── Tabs ── */}
              <div className="bg-white px-6 pt-6 pb-10 rounded-xl">
                <div className="flex gap-8 border-b-2 border-grey mb-8 overflow-x-auto">
                  {[
                    { key: 'overview',  label: 'Course Overview' },
                    { key: 'syllabus', label: 'Syllabus'         },
                    { key: 'reviews',  label: 'Reviews'          },
                    { key: 'related',  label: 'Related Courses'  },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`pb-4 font-medium text-sm whitespace-nowrap cursor-pointer ${
                        activeTab === key
                          ? 'text-haelsoft-primary border-b-2 border-haelsoft-primary'
                          : 'text-inactive hover:text-black'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Overview */}
                <div className={activeTab === 'overview' ? '' : 'hidden'}>
                  <div className="border border-grey p-6 rounded-xl">
                    <h2 className="text-2xl font-bold text-black mb-4">About This Course</h2>
                    {course.description ? (
                      <p className="text-inactive text-sm leading-relaxed whitespace-pre-line">
                        {course.description}
                      </p>
                    ) : (
                      <p className="text-inactive text-sm italic">No description provided.</p>
                    )}
                  </div>
                </div>

                {/* Syllabus */}
                <div className={activeTab === 'syllabus' ? '' : 'hidden'}>
                  <div className="space-y-3">
                    {course.sections?.length === 0 && (
                      <p className="text-center text-sm text-inactive py-10">No syllabus available yet.</p>
                    )}
                    {(course.sections || []).map((section) => {
                      const totalMins  = sectionTotalMinutes(section.lessons);
                      const lessonCount = section.lessons?.length || 0;
                      const isOpen = expandedSections[section.id];
                      return (
                        <div key={section.id} className="border border-grey rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-grey/50 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <svg className="w-6 h-6 text-haelsoft-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                              <span className="font-semibold text-black text-left">{section.title}</span>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0 text-sm text-inactive">
                              <span>
                                {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}
                                {totalMins > 0 && ` · ${formatMinutes(totalMins)}`}
                              </span>
                              <svg
                                className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </button>

                          <div className={isOpen ? '' : 'hidden'}>
                            <div className="bg-grey/30 border-t border-grey space-y-2 px-6 py-4">
                              {lessonCount === 0 && (
                                <p className="text-sm text-inactive text-center py-2">No lessons yet.</p>
                              )}
                              {(section.lessons || []).map((lesson) => {
                                // Enrolled students can access all lessons; others only free previews
                                const isClickable = lesson.is_free_preview || enrolled;
                                const isActive    = activeLesson?.id === lesson.id;
                                const isLocked    = !lesson.is_free_preview && !enrolled;

                                return (
                                  <button
                                    key={lesson.id}
                                    type="button"
                                    disabled={!isClickable || lessonLoading}
                                    onClick={() => handleLessonClick(lesson)}
                                    className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition ${
                                      isActive
                                        ? 'bg-orange-50 border border-haelsoft-primary/30'
                                        : isClickable
                                          ? 'bg-white hover:bg-orange-50/60 cursor-pointer'
                                          : 'bg-white cursor-default opacity-60'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      {lesson.lesson_type === 'video' && (
                                        <svg className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-haelsoft-primary' : isLocked ? 'text-gray-300' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M8 5v14l11-7z" />
                                        </svg>
                                      )}
                                      {lesson.lesson_type === 'pdf' && (
                                        <svg className={`w-5 h-5 flex-shrink-0 ${isLocked ? 'text-gray-300' : 'text-red-400'}`} fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
                                        </svg>
                                      )}
                                      {lesson.lesson_type === 'text' && (
                                        <svg className={`w-5 h-5 flex-shrink-0 ${isLocked ? 'text-gray-300' : 'text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                      )}
                                      <span className={`text-sm ${isActive ? 'font-semibold text-haelsoft-primary' : isLocked ? 'text-gray-400' : 'text-black'}`}>
                                        {lesson.title}
                                      </span>
                                    </div>
                                    <div className="flex flex-shrink-0 items-center gap-2">
                                      {/* Free preview badge — only shown to non-enrolled users */}
                                      {lesson.is_free_preview && !enrolled && !isActive && (
                                        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-haelsoft-primary">
                                          Preview
                                        </span>
                                      )}
                                      {/* Lock icon — only for non-enrolled users on gated lessons */}
                                      {isLocked && (
                                        <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                      )}
                                      {lesson.duration_minutes > 0 && (
                                        <span className="text-xs text-inactive">
                                          {formatMinutes(lesson.duration_minutes)}
                                        </span>
                                      )}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={activeTab === 'reviews' ? '' : 'hidden'}>
                  <div className="text-center py-12">
                    <p className="text-inactive text-sm">Reviews coming soon.</p>
                  </div>
                </div>

                <div className={activeTab === 'related' ? '' : 'hidden'}>
                  <div className="text-center py-12">
                    <p className="text-inactive text-sm">Related courses coming soon.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right column — price card ── */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-grey rounded-2xl p-6 sticky top-24 space-y-6">
                {/* Price */}
                <div>
                  <div className="flex justify-between gap-3 mb-1">
                    <span className="text-4xl font-bold text-black">
                      {isFree ? 'Free' : `₦${price.toLocaleString()}`}
                    </span>
                    {discountPct > 0 && (
                      <div className="bg-[#34A853] text-white flex items-center text-xs lg:text-sm px-3 py-2 rounded-xl self-start">
                        {discountPct}% off
                      </div>
                    )}
                  </div>
                  {discountPrice > 0 && (
                    <span className="text-inactive line-through text-sm">
                      ₦{discountPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* ── Enrollment CTA ── */}
                {enrollSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm text-center">
                    You&apos;re enrolled! 🎉
                  </div>
                )}
                {enrollError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm text-center">
                    {enrollError}
                  </div>
                )}

                {enrolled ? (
                  <a
                    href={`/courses/${slug}/learn`}
                    className="w-full block text-center bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                  >
                    Continue Learning →
                  </a>
                ) : checkingEnrollment ? (
                  <button disabled className="w-full border-2 border-grey text-inactive py-3 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-inactive border-t-transparent rounded-full animate-spin" />
                    Checking…
                  </button>
                ) : !currentUser ? (
                  <button
                    onClick={() => { window.location.href = `/login?next=/courses/${slug}`; }}
                    className="w-full border-2 border-haelsoft-primary text-haelsoft-primary py-3 rounded-xl font-semibold hover:bg-haelsoft-primary hover:text-white transition-colors"
                  >
                    {isFree ? 'Sign in to Enroll' : 'Sign in to Buy'}
                  </button>
                ) : !isStudent ? (
                  <div className="w-full text-center text-sm text-inactive py-3 border border-grey rounded-xl">
                    Only students can enroll in courses.
                  </div>
                ) : isFree ? (
                  <button
                    onClick={handleFreeEnroll}
                    disabled={enrolling}
                    className="w-full border-2 border-haelsoft-primary text-haelsoft-primary py-3 rounded-xl font-semibold hover:bg-haelsoft-primary hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {enrolling ? (
                      <>
                        <span className="w-4 h-4 border-2 border-haelsoft-primary border-t-transparent rounded-full animate-spin" />
                        Enrolling…
                      </>
                    ) : 'Enroll for Free'}
                  </button>
                ) : (
                  <button
                    onClick={() => { window.location.href = `/courses/${slug}/checkout`; }}
                    className="w-full bg-linear-to-t from-haelsoft-primary from-36% to-haelsoft-secondary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-colors"
                  >
                    Buy Now — ₦{price.toLocaleString()}
                  </button>
                )}

                {/* Course details */}
                <div className="space-y-4 border-t border-grey pt-6">
                  <h3 className="font-bold text-black">Course Details</h3>
                  <div className="flex gap-3 text-sm items-start">
                    <img src={BeginnerIcon} alt="" className="w-6 h-6 flex-shrink-0" />
                    <span className="text-inactive capitalize">{course.difficulty_level} level</span>
                  </div>
                  <div className="flex gap-3 text-sm items-start">
                    <img src={ClockIcon} alt="" className="w-6 h-6 flex-shrink-0" />
                    <span className="text-inactive">
                      {course.duration_hours} {course.duration_hours === 1 ? 'hour' : 'hours'} of content
                    </span>
                  </div>
                  {course.lessons_count > 0 && (
                    <div className="flex gap-3 text-sm items-start">
                      <img src={HexagonIcon} alt="" className="w-6 h-6 flex-shrink-0" />
                      <span className="text-inactive">{course.lessons_count} lessons</span>
                    </div>
                  )}
                  <div className="flex gap-3 text-sm items-start">
                    <img src={MoneyIcon} alt="" className="w-6 h-6 flex-shrink-0" />
                    <span className="text-inactive">Flexible payment options available</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="border-t border-grey pt-6">
                  <h3 className="font-bold text-black mb-4">About the Instructor</h3>
                  <div className="flex gap-3 mb-3">
                    {course.instructor_avatar ? (
                      <img
                        src={course.instructor_avatar}
                        alt={course.instructor_name}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <span className="w-12 h-12 rounded-full bg-haelsoft-primary/15 text-haelsoft-primary font-bold flex items-center justify-center flex-shrink-0 text-sm">
                        {getInitials(course.instructor_name)}
                      </span>
                    )}
                    <div>
                      <h4 className="font-semibold text-black text-sm">{course.instructor_name}</h4>
                      {course.total_students > 0 && (
                        <p className="text-inactive text-xs">{course.total_students.toLocaleString()} students</p>
                      )}
                    </div>
                  </div>
                  {rating > 0 && (
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex gap-0.5">{renderStars(rating)}</div>
                      <span className="font-semibold">{rating.toFixed(1)}</span>
                      <span className="text-inactive">({course.total_reviews} {course.total_reviews === 1 ? 'review' : 'reviews'})</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
