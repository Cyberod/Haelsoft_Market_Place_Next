import SectionHeader from '@/components/SectionHeader';
import CallToAction from '@/components/CallToAction';
import WhyUsCards from '@/components/WhyUsCards';
import HowItWorksSection from '@/components/HowItWorksSection';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'How It Works — Haelsoft Marketplace for Learners, Instructors & Affiliates',
  description:
    'Learn how Haelsoft Marketplace works for learners, instructors, and affiliates — sign up, publish, sell, and earn in a few easy steps.',
  path: '/HowitWorks',
  absoluteTitle: true,
});

export default function HowitWorks() {
  const sections = [
    {
      badge: "Educators & Creators",
      title: "How it works for Educators & Creators",
      image: "/HiwInstructor.png",
      button: "Start Selling Now",
      imagePosition: "right",
      steps: [
        {
          number: 1,
          title: "Create Your Account",
          substeps: [
            "Sign up for a free Haelsoft creator account",
            "Complete your profile with professional information",
            "Verify your email and set up payment details"
          ]
        },
        {
          number: 2,
          title: "Create and Upload Your Course",
          substeps: [
            "Design your course curriculum and structure",
            "Upload video lectures, documents, and resources",
            "Set pricing and course details"
          ]
        },
        {
          number: 3,
          title: "Launch and Promote",
          substeps: [
            "Publish your course to the marketplace",
            "Share your course link with your audience",
            "Earn revenue from every student enrollment"
          ]
        },
        {
          number: 4,
          title: "Manage and Grow",
          substeps: [
            "Access detailed analytics and student feedback",
            "Update course content regularly",
            "Scale your business with multiple courses"
          ]
        }
      ]
    },
    {
      badge: "Learners & Students",
      title: "How it works for Learners & Students",
      image: "/HiwLearner.png",
      button: "Browse Courses",
      imagePosition: "left",
      steps: [
        {
          number: 1,
          title: "Explore Courses",
          substeps: [
            "Browse thousands of courses across different categories",
            "Filter by skill level, price, and instructor rating",
            "Read reviews from other learners"
          ]
        },
        {
          number: 2,
          title: "Enroll in a Course",
          substeps: [
            "Select your desired course and review the curriculum",
            "Complete the purchase or enroll in free courses",
            "Get instant access to all course materials"
          ]
        },
        {
          number: 3,
          title: "Learn at Your Pace",
          substeps: [
            "Watch video lectures anytime, anywhere",
            "Complete assignments and quizzes",
            "Interact with instructors and classmates"
          ]
        },
        {
          number: 4,
          title: "Earn Certificate",
          substeps: [
            "Complete all course requirements",
            "Download your certificate of completion",
            "Showcase your achievement on LinkedIn"
          ]
        }
      ]
    },
    {
      badge: "Affiliate & Referrers",
      title: "How it works for Affiliate & Referrers",
      image: "/HiwAffiliate.png",
      button: "Browse an Affiliate",
      imagePosition: "right",
      steps: [
        {
          number: 1,
          title: "Join the Affiliate Program",
          substeps: [
            "Sign up for our affiliate partner program",
            "Get your unique referral link",
            "Access marketing materials and resources"
          ]
        },
        {
          number: 2,
          title: "Promote Courses",
          substeps: [
            "Share your referral links on social media",
            "Promote to your email list and website",
            "Recommend courses relevant to your audience"
          ]
        },
        {
          number: 3,
          title: "Earn Commissions",
          substeps: [
            "Track clicks and conversions in real-time",
            "Earn commission on every successful referral",
            "Get paid monthly to your account"
          ]
        },
        {
          number: 4,
          title: "Scale Your Earnings",
          substeps: [
            "Access exclusive promotional campaigns",
            "Unlock higher commission tiers with performance",
            "Build passive income through referrals"
          ]
        }
      ]
    }
  ];

  return (
    <>
      <section id="HowItWorks" className="max-w-full pt-6 sm:pt-8 md:pt-10 lg:pt-12">
        {/* Hero Section */}
        <div className="font-inter px-4 md:px-8">
          <div className="text-center font-inter flex flex-col items-center frame">
            <div className="sm:px-5 lg:px-[100px] xl:px-[180px] 2xl:px-[260px] tracking-[0px] items-center text-center flex flex-col">
              <SectionHeader
                as="h1"
                badge="How Haelsoft Works"
                title="Sell, Learn, and Grow with Haelsoft Marketplace"
                description="Our platform makes it easy for educators to monetize their expertise and for learners to access high-quality courses, digital products, and services."
              />
            </div>
          </div>
        </div>

        {/* How it Works Sections */}
        <div className="mt-16 md:mt-24 frame">
          {sections.map((section, index) => (
            <HowItWorksSection
              key={index}
              section={section}
            />
          ))}
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


        {/* Call to Action */}

        <div className="frame">
          <CallToAction 
          title="Start your Journey Today"
          description="Whether you are an educator, learner, or affiliate, Haelsoft EdTech provides everything you need to succeed."
          buttonText="Get started"
          buttonLink="/signup"
        />
        </div>



      {/* <Footer /> comes from the (public) layout */}
      </section>

    </>
  );
}

