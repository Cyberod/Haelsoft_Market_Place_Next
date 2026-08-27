import SmartLink from './SmartLink';

const DIFFICULTY_STYLES = {
  beginner:     { label: 'Beginner',     bg: 'bg-green-50',  text: 'text-green-600'  },
  intermediate: { label: 'Intermediate', bg: 'bg-blue-50',   text: 'text-blue-600'   },
  advanced:     { label: 'Advanced',     bg: 'bg-purple-50', text: 'text-purple-600' },
};



function getInitials(name = '') {
  return name.trim().split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

export default function CourseCard({ course }) {
  const difficulty = DIFFICULTY_STYLES[course.difficulty_level] || DIFFICULTY_STYLES.beginner;
  const isFree     = Number(course.price) === 0;
  const initials   = getInitials(course.instructor_name);

  return (
    <SmartLink
      href={`/courses/${course.slug}`}
      className="group bg-white rounded-2xl border border-grey overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-[#FFF0EB] to-[#FEF7FF] overflow-hidden">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-10 h-10 text-haelsoft-primary opacity-25" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
        )}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${difficulty.bg} ${difficulty.text}`}>
          {difficulty.label}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-black text-sm leading-snug line-clamp-2 group-hover:text-haelsoft-primary transition-colors">
          {course.title}
        </h3>

        {course.short_description && (
          <p className="text-xs text-inactive line-clamp-2 leading-relaxed">
            {course.short_description}
          </p>
        )}

        {/* Instructor */}
        <div className="flex items-center gap-2 mt-0.5">
          {course.instructor_avatar ? (
            <img
              src={course.instructor_avatar}
              alt={course.instructor_name}
              className="w-6 h-6 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <span className="w-6 h-6 rounded-full bg-haelsoft-primary/15 text-haelsoft-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0">
              {initials}
            </span>
          )}
          <span className="text-xs text-inactive truncate">{course.instructor_name}</span>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-inactive">
          {course.duration_hours > 0 && (
            <span>{course.duration_hours} hrs</span>
          )}
          {course.lessons_count > 0 && (
            <span>{course.lessons_count} lessons</span>
          )}
          {course.total_students > 0 && (
            <span>{course.total_students.toLocaleString()} students</span>
          )}
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-grey">
          <span className="text-haelsoft-primary font-bold">
            {isFree ? 'Free' : `₦${Number(course.price).toLocaleString()}`}
          </span>
          {course.discount_price && Number(course.discount_price) > 0 && (
            <span className="text-xs text-inactive line-through">
              ₦{Number(course.discount_price).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </SmartLink>
  );
}
