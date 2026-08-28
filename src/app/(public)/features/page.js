import SectionHeader from '@/components/SectionHeader';
import WhyUsCards from '@/components/WhyUsCards';
import CallToAction from '@/components/CallToAction';
import FeaturesOverview from '@/components/FeaturesOverview';
import { buildMetadata } from '@/lib/metadata';

// Title/description carried over verbatim from the page's <Helmet>. The
// canonical is now derived from the path instead of being hardcoded.
export const metadata = buildMetadata({
  title: 'Features — What You Get on Haelsoft Marketplace',
  description:
    "Discover Haelsoft Marketplace's powerful features for instructors, learners, and affiliates — course hosting, digital product sales, analytics, and more.",
  path: '/features',
  // The SPA's title carried no "| Haelsoft" suffix and already names the brand;
  // the template would render "…Haelsoft Marketplace | Haelsoft".
  absoluteTitle: true,
});

// No data fetching, so this prerenders to static HTML at build time.
export default function Features() {
  return (
    <section id="Home" className="max-w-full pt-6 sm:pt-8 md:pt-10 lg:pt-12">
      {/* Hero Section */}
      <div className="sm:px-5 lg:px-[100px] xl:px-[180px] 2xl:px-[260px] tracking-[0px] frame">
        <div className="flex flex-col justify-center items-center text-center">
          <p className="py-[10px] px-4 font-[18px] text-section-text bg-section-text-bg rounded-3xl mb-3.25">Features Overview&quot;</p>
          <h1 className="text-[32px] sm:text-[33px] md:text-[38px] lg:text-[48px] font-bold lg:leading-17.5 leading-10 xl:px-[100px]">Powerful Features to Help you <span className="bg-[#2E6E6E] text-white px-6 py-[3px] rounded-xl">Sell</span></h1>
          <p className="font-[18px] md:font-[20px] text-inactive xl:leading-8 xl:tracking-[0.5px] mt-4 max-w-2xl">Haelsoft EdTech provides all the tools you need to create, sell, and manage your digital
            products, courses, and services—all in one place.</p>
        </div>
      </div>

      <div className="frame">
        <FeaturesOverview />
      </div>

      {/* Why Us */}
      <div className=' text-center font-inter  flex flex-col items-center bg-[#F7FBFC] frame py-43 lg:py-50'>
        <SectionHeader
          badge="Why Us"
          title="Why Choose Haelsoft Marketplace?"
          description=""
        />

        <WhyUsCards />
      </div>

      <div className="frame">
        <CallToAction
          title="Start Selling and Teaching Today"
          description="Join thousands of educators and entrepreneurs building their businesses on Haelsoft EdTech."
          buttonText="Get started"
          buttonLink=""
        />
      </div>

      {/* <Footer /> is provided by the (public) layout, not the page. */}
    </section>
  );
}
