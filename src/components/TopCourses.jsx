import SectionHeader from './SectionHeader';
import CourseCard from './CourseCard';
import OrangeButton from './OrangeButton';
import { getFeaturedCourses } from '@/lib/api';

// Server component: fetched during render, so the featured courses are in the
// initial HTML. The SPA fetched on mount and showed three skeletons, meaning a
// crawler saw only the placeholders.
export default async function TopCourses() {
  let courses = [];
  try {
    courses = await getFeaturedCourses();
  } catch {
    courses = [];
  }

  return (
    <div className="mt-6 lg:mt-10 py-12 sm:py-16 md:py-20">
      <div className="text-center font-inter flex flex-col items-center mb-12 md:mb-16">
        <div className="items-center text-center flex flex-col">
          <SectionHeader
            badge="Our Top Selling Courses"
            title="Explore Our Best-Selling Courses"
            description="Learn skills that drive growth in Tech, Business,
            Health, and more—designed for beginners and experts alike."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => <CourseCard key={course.id} course={course} />)
        ) : (
          <p className="col-span-3 text-center text-inactive py-10">
            No featured courses at the moment. Check back soon.
          </p>
        )}
      </div>

      <div className="mt-10 text-center">
        <OrangeButton text="See All" to="/marketplace" />
      </div>
    </div>
  );
}
