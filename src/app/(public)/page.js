import SectionHeader from '@/components/SectionHeader';
import TopCourses from '@/components/TopCourses';
import MarketplaceCards from '@/components/MarketplaceCards';
import FeaturedInstructors from '@/components/FeaturedInstructors';
import HowItWorks from '@/components/HowItWorks';
const comp1 = "/comp1.jpeg";
const comp2 = "/comp2.jpeg";
const comp3 = "/comp3.jpeg";
const comp4 = "/comp4.png";
const comp5 = "/comp5.png";
const comp6 = "/comp6.png";
const comp7 = "/comp7.png";
const comp8 = "/comp8.jpeg";
const comp9 = "/comp9.png";
const comp10 = "/comp10.png";
const comp11 = "/comp11.png";
const comp12 = "/comp12.png";
const comp13 = "/comp13.png";
const comp14 = "/comp14.png";
const comp15 = "/comp15.png";
import Testimonials from '@/components/Testimonials';
import FAQs from '@/components/FAQs';
import CallToAction from '@/components/CallToAction';
import TrustindexWidget from '@/components/TrustindexWidget';
import SmartLink from '@/components/SmartLink';
import { buildMetadata } from '@/lib/metadata';

const TRUSTINDEX_GOOGLE_REVIEW_SRC = "https://cdn.trustindex.io/loader.js?bd8d47c71c64804eed162b7cb3f";
const TRUSTINDEX_WIDGET_FEED_SRC = "https://cdn.trustindex.io/loader-feed.js?b88926e713d8804b4866c3ed4ec";

export const metadata = buildMetadata({
  title: 'Haelsoft Marketplace — Buy & Sell Tech, Business & Creative Digital Products',
  description:
    "Haelsoft Marketplace is Nigeria's premier platform to buy and sell digital products, online courses, and creative assets in Tech, Business, Health, and more.",
  path: '/',
  absoluteTitle: true,
});

export default async function Home() {

  const logos = [
    { src: comp1, alt:"comp1 Logo" },
    { src: comp2, alt:"comp1 Logo" },
    { src: comp3, alt:"comp1 Logo" },
    { src: comp4, alt:"comp1 Logo" },
    { src: comp5, alt:"comp1 Logo" },
    { src: comp6, alt:"comp1 Logo" },
    { src: comp7, alt:"comp1 Logo" },
    { src: comp8, alt:"comp1 Logo" },
    { src: comp9, alt:"comp1 Logo" },
    { src: comp10, alt:"comp1 Logo" },
    { src: comp11, alt:"comp1 Logo" },
    { src: comp12, alt:"comp1 Logo" },
    { src: comp13, alt:"comp1 Logo" },
    { src: comp14, alt:"comp1 Logo" },
    { src: comp15, alt:"comp1 Logo" },


  ];

  const testimonials = [
    {
      id: 1,
      text: "Taking part in the Haelsoft Master Class was truly a life-changing experience for me. Before joining, I had only a basic understanding of digital tools, but the training broke everything down in a clear and practical way. The instructors were patient, approachable.",
      name: "Alamu Ayobami",
      profession: "Bradford University UK",
      image: "/AlamuAyobami.jpeg",
    },
    {
      "id": 2,
      "text": "My journey into Africa’s digital future began at Haelsoft. Enrolling in Haelsoft’s Digital Marketing Program in 2013 gave me the foundation, structure, and clarity I needed at a time when I was still discovering my path.",
      "name": "Adeoye Wilson",
      "profession": "Startup and Growth Strategy Expert",
      "image": "/AdeoyeWilson.jpeg",
    },
    {
      "id": 3,
      "text": "My name is Babajide Abiodun Ogunnoiki, and I owe a significant part of my career success to the early training I received from Haelsoft. Under the guidance of its visionary founder, I learned the fundamentals of digital marketing, a foundation that not only equipped me with essential skills but also helped me earn Google Advertising certifications over the past decade.",
      "name": "Babajide Abiodun",
      "profession": "Junior Developer",
      "image": "/BabajideAbiodun.jpeg",
    },
  ];

  return (
    <section id="Home" className="max-w-full pt-6 sm:pt-8 md:pt-10 lg:pt-12 ">
      {/* Hero Section */}
      <div className="font-inter px-4 md:px-8">

        <div className="text-center font-inter flex flex-col items-center frame">
          <div className="sm:px-5 lg:px-[100px] xl:px-[180px] 2xl:px-[260px] tracking-[0px] items-center text-center flex flex-col">
            <SectionHeader
            badge="Empower. Inspire. Earn"
            title="Share your Knowledge, Impact lives, and build income doing what you love"
            description="Join a thriving marketplace where educators sell courses, 
            digital products, services,  and subscriptions to eager learners worldwide."
          />
          </div>

            <div className="w-full px-4 flex flex-col md:flex-row items-center justify-center md:justify-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 md:mt-10">
              <SmartLink href="/marketplace" className="w-full md:w-auto border border-linear-to-t from-haelsoft-primary from-36% to-haelsoft-secondary text-haelsoft-primary px-6 py-3 rounded-xl text-sm sm:text-base md:text-[16px] font-semibold cursor-pointer text-center">Browse Course</SmartLink>
              <SmartLink href="/signup?role=instructor" className="w-full md:w-auto bg-linear-to-t from-haelsoft-primary from-36% to-haelsoft-secondary text-white px-6 py-3 rounded-xl text-sm sm:text-base md:text-[16px] font-semibold cursor-pointer text-center">Start Selling</SmartLink>

            </div>
        <div className="w-full mt-8 sm:mt-12 md:mt-16 px-1 sm:px-4 md:px-8 lg:px-10 xl:px-[40px] 2xl:px-[82px]">            
          <img src="/HomeImage.png" alt="Pricing Hero Image" className="w-full h-auto object-cover" />
        </div>
          </div>

      </div>

      {/* Payment Partners Section */}
      <div className="py-12 sm:py-16 md:py-20">
        {/* Centered text with lines */}
        <div className="flex items-center justify-center gap-4 mb-6 lg:mb-10 px-4">
          <div className="payment-line"></div>
          <span className="text-inactive text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap">Our Partners</span>
          <div className="payment-line"></div>
        </div>

        {/* Infinite carousel */}
        <div className="overflow-hidden">
          <div className="carousel-track">
            {logos.map((logo, index) => (
              <div key={index} className="carousel-item">
                <img src={logo.src} alt={logo.alt} className="w-[60px] lg:w-[100px] " />
              </div>
            ))}
            {logos.map((logo, index) => (
              <div key={`duplicate-${index}`} className="carousel-item">
                <img src={logo.src} alt={logo.alt} className="w-[60px] lg:w-[100px]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Courses Section */}
      <div className="frame">
        <TopCourses />
      </div>
        
      
      {/* Marketplace Section */}
      <div className="py-12 sm:py-16 md:py-20 frame">
        <div className="px-5 lg:px-[100px] xl:px-[180px] 2xl:px-[260px] tracking-[0px] items-center text-center flex flex-col">
          <SectionHeader
            badge="Amazing Marketplace"
            title="Sell Any kind of Product, Service or Subscription"
            description="Educators can monetize their expertise in multiple ways:"
          />
        </div>

        <MarketplaceCards />
      </div>

      {/* Featured Instructors Section */}
      <FeaturedInstructors />

      {/* How it Works */}
      <div className="py-12 sm:py-16 md:py-20 frame">
        <div className="tracking-[0px] items-center text-center flex flex-col mb-10">

          <SectionHeader
            badge=""
            title="How it Works"
            description="Step by Step Process for both Instructors and Learners"
          />
        </div>

        <HowItWorks />
      </div>

      {/* Testimonials */}
      <div className="frame">
          <Testimonials 
          testimonials={testimonials}
          badge="Testimonial"
          title="Testimonials from Educators and Students"
          description="Have a look at how we've helped others achieve their goals"
        />
      </div>

      {/* Trust Index Google Review */}
      <div className="frame py-12 sm:py-16 md:py-20">
        <TrustindexWidget src={TRUSTINDEX_GOOGLE_REVIEW_SRC} />
      </div>

      {/* FAQs */}
        <div className=' lg:mb-20 text-center font-inter  flex flex-col items-center frame'>
          <SectionHeader
            badge="FAQs"
            title="Frequently Asked Questions"
            description="Educators can monetize their expertise in multiple ways:"
          />
          <FAQs />
        </div>

        {/* TrustIndex Widget Feed */}
        <div className="frame py-12 sm:py-16 md:py-20">
          <TrustindexWidget src={TRUSTINDEX_WIDGET_FEED_SRC} />
        </div>

        {/* Call to Action */}

        <div className="mb-16 frame ">

          <CallToAction
            title="Join the Community. Share the Knowledge. Earn as an Affiliate."
            description="Choose a pricing plan that works for you and start monetizing your knowledge across Africa."
            buttonText="Get started"
            buttonLink="/signup"
          />
        </div>
      {/* <Footer /> comes from the (public) layout */}




        </section>
  );
}
