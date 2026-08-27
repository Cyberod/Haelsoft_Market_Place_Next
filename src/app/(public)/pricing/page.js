import PricingSection from '@/components/PricingSection';
import SectionHeader from '@/components/SectionHeader';
import WhyUsCards from '@/components/WhyUsCards';
import FAQs from '@/components/FAQs';
import CallToAction from '@/components/CallToAction';
import { buildMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import { faqPage } from '@/lib/schema';
import { faqs } from '@/lib/faqs';

export const metadata = buildMetadata({
  title: 'Pricing — Instructor & Affiliate Plans | Haelsoft Marketplace',
  description:
    'Choose the right Haelsoft plan to sell your courses and digital products. Flexible monthly and annual pricing for instructors and affiliates.',
  path: '/pricing',
  // The SPA title already ends in "| Haelsoft Marketplace".
  absoluteTitle: true,
});

export default function PricingPage() {
  return (
    <section id="Pricing" className="max-w-full pt-10">
      <JsonLd data={faqPage(faqs)} />
      <div className="">

        {/* Hero Section */}
        <div className="text-center  font-inter mb-20 frame">
          <div className=" px-4.5 sm:px-10 md:px-20 lg:px-25 xl:px-45 2xl:px-58.5">
            <p className="font-bold text-[37px] sm:text-[45px] md:hidden">Flexible <br /> Pricing Plans for Every Educator &amp; Creator in Africa</p>
            <p className="font-bold md:text-[50px] lg:text-[60px] hidden md:block md:px-15 lg:px-5 xl:px-15 2xl:px-25.5 leading-19.5">Flexible Pricing Plans for Every Educator &amp; Creator in Africa</p>

            <p className="text-inactive text-center font-[16px] md:font-[20px] leading-8 tracking-[0.5px] mt-6">Sell courses, digital products, services, and subscriptions with a pricing model designed
              to support educators and entrepreneurs across all 54 African countries.</p>
          </div>

          <div>
            <img src="/pricingHero.png" alt="Pricing Hero Image" className="w-auto object-cover xl:px-[40px] 2xl:px-[82px]" />
          </div>
        </div>

        {/* Pricing plan — client island: billing toggle + cards */}
        <PricingSection />

        {/* Why Us */}
        <div className=' text-center font-inter  flex flex-col items-center bg-[#F7FBFC] frame py-43 lg:py-50'>
          <SectionHeader
            badge="Why Us"
            title="Why Choose Haelsoft Marketplace?"
            description=""
          />

          <WhyUsCards />
        </div>

        {/* FAQs */}
        <div className=' py-27 text-center font-inter  flex flex-col items-center'>
          <SectionHeader
            badge="FAQs"
            title="Frequently Asked Questions"
            description="Educators can monetize their expertise in multiple ways:"
          />
          <FAQs />
        </div>

        {/* Call to Action */}
        <div className='frame'>
          <CallToAction
            title="Start Selling Today!"
            description="Choose a pricing plan that works for you and start monetizing your knowledge across Africa."
            buttonText="Get started"
            buttonLink=""
          />
        </div>

        {/* <Footer /> comes from the (public) layout */}
      </div>
    </section>
  );
}
