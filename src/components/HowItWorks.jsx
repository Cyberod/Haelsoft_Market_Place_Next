import OrangeButton from "./OrangeButton";


const instructorSteps = [
  {
    step: "Step 1",
    image: "/instrustorStep1.png",
    title: "Create and Upload your Course",
    description: "Upload your materials to get started",
  },
  {
    step: "Step 2",
    image: "/instructorStep2.png",
    title: "Set your Pricing and Start Earning",
    description: "Create & upload your course, product, or service in minutes",
  },
  {
    step: "Step 3",
    image: "/instructorStep3.png",
    title: "Engage with Student and Build your Brand",
    description: "Create & upload your course, product, or service in minutes",
  },
]


const learnersSteps = [
  {
    step: "Step 1",
    image: "/learnerStep1.png",
    title: "Discover Courses & more",
    description: "Browse courses, Digital Products and Services in Tech, Business, Health and more",
  },
  {
    step: "Step 2",
    image: "/learnerStep2.png",
    title: "Learn at Your Pace Lifetime Access",
    description: "Study Anytime, Anywhere. Grow at Your Own Speed, The Journey Is Yours",
  },
  {
    step: "Step 3",
    image: "/learnerStep3.png",
    title: "Earn Certificate & Enhance your Career",
    description: "Be Proud of What You’ve Learned — Build Credibility and Unlock New Opportunities.",
  },
]

export default function HowItWorks() {
  return (
    <div className="flex flex-col">
      <div className="mb-20">

        <div className="font-inter mb-10 ">
        
        <div className="px-4 py-2 font-[12px] md:font-[18px] text-section-text bg-section-text-bg rounded-3xl mb-3.25 w-fit">For Instructors</div>
        <p className="text-[16px] md:text-[20px] text-black tracking-0">Simple 3-Step process to become an amazing Instructor on Haelsoft</p>

        </div>



          {/* Steps Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {instructorSteps.map((step, index) => (
                <div key={index} className="w-full p-6  lg:p-0 rounded-3xl h-auto border border-gray-300 font-inter">

                <div className="w-full p-6 lg:px-6 ">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full "
                  />
                </div>

                {/* Content */}
                <div className=" sm:p-8 font-inter">
                  <div className=" text-inactive rounded-full px-6 py-2  text-sm mb-2 lg:mb-4 w-fit shadow-[0_0_10px_rgba(0,0,0,0.25)]">
                    {step.step}
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-[16px] xl:text-2xl font-semibold text-black mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-xs xl:text-base text-inactive ">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
            <div className="mt-10 text-center">
                <OrangeButton text="Start Selling" to="/signup?role=instructor" />
            </div>

      </div>

      <div className="mb-20">

        <div className="font-inter mb-10 ">
        
        <div className="px-4 py-2 font-[12px] md:font-[18px] text-section-text bg-section-text-bg rounded-3xl mb-3.25 w-fit">For Learners</div>
        <p className="text-[16px] md:text-[20px] text-black tracking-0">Simple 3-Step process to become an amazing Learners on Haelsoft</p>

        </div>



          {/* Steps Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {learnersSteps.map((step, index) => (
                <div key={index} className="w-full p-6  lg:p-0 rounded-3xl h-auto border border-gray-300 font-inter">

                <div className="w-full p-6 lg:px-6 ">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full "
                  />
                </div>

                {/* Content */}
                <div className=" sm:p-8 font-inter">
                  <div className=" text-inactive rounded-full px-6 py-2  text-sm mb-2 lg:mb-4 w-fit shadow-[0_0_10px_rgba(0,0,0,0.25)]">
                    {step.step}
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-[16px] xl:text-2xl font-semibold text-black mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-xs xl:text-base text-inactive ">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
            <div className="mt-10 text-center">
                <OrangeButton text="Start Learning" to="/marketplace" />
            </div>

      </div>
    </div>
  );
}
