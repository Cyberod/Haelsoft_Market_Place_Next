import SmartLink from './SmartLink';
import { getFeaturedInstructors } from '@/lib/api';

const RightArrow = '/right_arrow.svg';

// Server component — the instructor names and bios are in the initial HTML
// rather than appearing after a client fetch.
export default async function FeaturedInstructors() {
  let instructors = [];
  let error = null;
  try {
    instructors = await getFeaturedInstructors();
  } catch {
    error = 'Unable to load featured instructors right now.';
  }

  return (
    <section className="bg-[#F7FBFC] py-12 sm:py-16 md:py-20">
      <div className="px-5 lg:px-[75px] mb-8">
        <h2 className="font-inter font-bold text-2xl sm:text-3xl md:text-[32px] text-black">
          Featured Instructors
        </h2>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 px-5 lg:px-[75px] w-max">
          {error && <p className="text-sm text-inactive">{error}</p>}

          {!error && instructors.map((instructor) => (
            <div key={instructor.id} className="flex-shrink-0 w-[280px] sm:w-[395px]  rounded-2xl ">
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-[330px] h-[300px] lg:w-[395px] lg:h-[429px]  rounded-xl"
              />
              <div className="p-5">
                <h3 className="font-semibold text-base sm:text-lg text-black mb-2">
                  {instructor.name}
                </h3>
                <p className="text-sm text-inactive leading-relaxed line-clamp-2 mb-4">
                  {instructor.bio}
                </p>
                {/* Points at /in/<slug>, the canonical profile URL, rather than
                    the /profile/<id> duplicate the SPA linked to. */}
                <SmartLink
                  href={`/in/${instructor.profile_slug || instructor.id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-haelsoft-primary bg-[#FDEDE7] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <img src={RightArrow} alt="" className="w-3 h-3" />
                  View Profile
                </SmartLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
