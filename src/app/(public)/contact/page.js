import SectionHeader from '@/components/SectionHeader';
import ContactForm from '@/components/ContactForm';
import ContactInformation from '@/components/ContactInformation';
import CallToAction from '@/components/CallToAction';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Contact Us — Haelsoft Marketplace Support',
  description:
    "Get in touch with the Haelsoft Marketplace team. We're here to help instructors, learners, and affiliates with any questions.",
  path: '/contact',
  absoluteTitle: true,
});

export default function Contact() {
  return (
    <section id="Contact" className="max-w-full pt-6 sm:pt-8 md:pt-10 lg:pt-12">
      {/* Hero Section */}
      <div className="sm:px-5 lg:px-[200px] xl:px-[350px]  2xl:px-[450px]  tracking-[0px] mb-10 lg:mb-20 ">
        <div className="w-full mx-auto px-4 py-8 flex flex-col justify-center items-center text-center frame">
          <p className="text-[32px] sm:text-[33px] md:text-[38px] lg:text-[48px] font-bold lg:leading-17.5 leading-10 flex justify-center">Get in Touch with Haelsoft Market Place</p>
          <p className="font-[18px] md:font-[20px] text-inactive xl:leading-8 xl:tracking-[0.5px] mt-4  justify-center">We’d love to hear from you, whether you are a student,
            instructor or guest. Feel free to reach out to us, Our team is ready to help.</p>
        </div>
      </div>

      <div className="frame">
        {/* Contact Form */}
        <ContactForm />
      </div>

      <div className="font-inter px-4 md:px-8 mt-10 lg:mt-20 flex flex-col">
        <div className="text-center font-inter flex flex-col items-center frame">
          <div className="sm:px-5 lg:px-[100px] xl:px-[180px] 2xl:px-[260px] tracking-[0px] items-center text-center flex flex-col">
            <SectionHeader
              badge="Other ways to Reach out"
              title="Ways to Contact Us"
              description=""
            />
          </div>
          <div className="w-full px-1 sm:px-4 md:px-8 lg:px-10 xl:px-[40px] 2xl:px-[82px]">
            <img src="/contact-image.png" alt="Pricing Hero Image" className="w-full h-auto object-cover" />
          </div>

          {/* Contact Information */}
          <div className="">
            <ContactInformation />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="my-12 lg:my-16 frame">
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
