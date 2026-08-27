import { notFound } from 'next/navigation';
import CourseDetail from '@/components/CourseDetail';
import { getPublicCourse, getCourseSlugs, ApiError } from '@/lib/api';
import { buildMetadata } from '@/lib/metadata';

export async function generateStaticParams() {
  try {
    const courses = await getCourseSlugs();
    return courses.filter((c) => c.slug).map((c) => ({ slug: c.slug }));
  } catch {
    // Never fail the build on a cold backend; pages render on demand instead.
    return [];
  }
}

async function load(slug) {
  try {
    return await getPublicCourse(slug);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let course;
  try {
    course = await getPublicCourse(slug);
  } catch {
    return buildMetadata({
      title: 'Course not found',
      description: 'This course is no longer available on Haelsoft Marketplace.',
      path: `/courses/${slug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: `${course.title} | Haelsoft`,
    description: course.short_description || course.title,
    path: `/courses/${slug}`,
    image: course.thumbnail_url || undefined,
    absoluteTitle: true,
  });
}

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const course = await load(slug);
  return <CourseDetail course={course} slug={slug} />;
}
