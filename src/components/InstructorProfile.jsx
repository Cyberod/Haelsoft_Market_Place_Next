import CourseCard from './CourseCard';
import ProductCard from './ProductCard';
import Testimonials from './Testimonials';
import CallToAction from './CallToAction';

/**
 * Server component: the only interactive part is the testimonials carousel,
 * which is its own client island. The bio, course grid and testimonial text
 * all render into the initial HTML - none of it was previously indexable,
 * since these pages had no server-rendered content at all.
 */
export default function InstructorProfile({ instructor }) {
  const socialLinks = instructor.socialLinks || [];
  const courses = instructor.courses || [];
  const products = instructor.products || [];
  const testimonials = instructor.testimonials || [];
  const bioParagraphs = (instructor.bio || "").split('\n\n').filter(Boolean);
  const hasContent = courses.length > 0 || products.length > 0;

  return (
    <section id="Profile" className="max-w-full pt-6 sm:pt-8 md:pt-10 lg:pt-12 ">
      {/* Hero Section */}
      <div className="font-inter ">

        <div className="text-center font-inter flex flex-col items-center frame">
            <div className="tracking-[0px]">

                <div className="flex flex-col justify-center items-center text-center">
                    <p className="py-[10px] px-4 font-[18px] text-section-text bg-section-text-bg rounded-3xl mb-3.25">Instructor Profile</p>
                    <p className="text-[32px] font-bold lg:leading-17.5 leading-10 ">{instructor.name}</p>
                   <p className="font-[16px] text-black xl:leading-8 xl:tracking-[0.5px]  max-w-2xl">{instructor.title}</p>
                </div>
            </div>


            <div className="w-full mt-8 sm:mt-12 md:mt-16  ">            
            <img src={instructor.profileImage || instructor.image} alt={instructor.name} className="w-full lg:w-[1290px] lg:h-[621px] rounded-4xl object-cover" />
            </div>
          </div>

      </div>

      {/* Instructor Profile Section */}
      <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
        {/* About Our Amazing Instructor */}
        <div className="mb-12 sm:mb-16 md:mb-20 frame">
          <h2 className="text-[24px] md:text-[28px] font-semibold text-black mb-6 md:mb-8">
            About Our Amazing Instructor
          </h2>

          {/* Biography Section - 2 column layout on larger screens */}
          <div className="columns-1 md:columns-2 gap-8 md:gap-10 text-sm md:text-base text-inactive leading-relaxed mb-8 md:mb-10">
            {bioParagraphs.map((paragraph, index) => (
              <p key={index} className="mb-6 break-inside-avoid">
                {paragraph}
              </p>
            ))}
            {socialLinks.length > 0 && (
              <div>
                <h3 className="text-[18px] md:text-[20px] font-semibold text-black mb-4">
                  Social Handles
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="transition-opacity hover:opacity-70"
                      title={social.name}
                    >
                      <img
                        src={social.icon}
                        alt={social.name}
                        className="w-8 h-8 md:w-10 md:h-10"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Social Handles Section */}

        </div>

        {/* Digital Products Section */}
        {products.length > 0 && (
          <div className="frame mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-[24px] md:text-[28px] font-semibold text-black mb-8 md:mb-10">
              Digital Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Available Courses Section */}
        {courses.length > 0 && (
          <div className="frame mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-[24px] md:text-[28px] font-semibold text-black mb-8 md:mb-10">
              Available Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* No content fallback */}
        {!hasContent && (
          <div className="frame mb-12">
            <p className="text-inactive">This instructor hasn&apos;t published any content yet.</p>
          </div>
        )}
      </div>

      {testimonials.length > 0 && (
        <div className="frame">
          {/* Testimonials */}
          <Testimonials 
            testimonials={testimonials}
            badge={`${instructor.name} users`}
            title={`What Others are saying about ${instructor.name}`}
            description="Have a look at how we’ve helped others achieve their goals"
          />
        </div>
      )}




        {/* Call to Action */}
        <div className="my-16 frame">

          <CallToAction 
            title="Join the Community. Share the Knowledge. Earn as an Affiliate."
            description="Choose a pricing plan that works for you and start monetizing your knowledge across Africa."
            buttonText="Get started"
            buttonLink=""
          />
        </div>

        {/* <Footer /> comes from the (public) layout */}
    </section>
  );
}
