'use client';

import { useState } from "react";
const LeftArrow = "/left_arrow.svg";
const RightArrow = "/right_arrow.svg";

export default function Testimonials({
  testimonials,
  badge = "Testimonial",
  title = "Testimonials from Educators and Students",
  description = "Have a look at how we've helped others acheive their goals",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const current = testimonials[currentIndex];

  return (
    <div className="py-12 sm:py-16 md:py-20 ">
      <div className=" ">
        <div className="flex flex-col xl:flex-row justify-between gap-12 lg:gap-16">
          {/* Left Side */}
          <div className="max-w-[464px] flex flex-col lg:w-1/2 ">
            {/* Badge */}
            <div className="px-4 py-2 font-[12px] md:font-[18px] text-section-text bg-section-text-bg rounded-3xl mb-4 w-fit">
              {badge}
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              {title}
            </h2>

            {/* Description */}
            <p className="text-base md:text-xl text-inactive mb-8 leading-relaxed">
              {description}
            </p>

            {/* Navigation Arrows */}
            <div className="flex gap-3 w-fit">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full border-2 border-[#FDF4F0] hover:bg-[#FDF4F0] transition-colors cursor-pointer"
              >
                <img src={LeftArrow} alt="Previous" className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full border-2 border-[#FDF4F0] hover:bg-[#FDF4F0] transition-colors cursor-pointer"
              >
                <img src={RightArrow} alt="Next" className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right Side - Testimonial Card */}
          <div className="xl:w-1/2">
            <div className="border border-gray-300 rounded-2xl p-6 sm:p-8 xl:pb-2 bg-white flex flex-col xl:flex-row xl:gap-6 sm:items-center sm:text-center xl:text-start xl:items-start">
              <div className="xl:flex-1">
                  {/* Testimonial Text */}
                <p className="text-lg md:text-[22px] sm:text-base xl:text-base font-bold text-black mb-8">
                  "{current.text}"
                </p>

                {/* Name and Profession */}
                <div className="mb-8 xl:mb-0 xl:mt-auto ">
                  <h4 className="text-lg sm:text-xl font-semibold text-black">
                    {current.name}
                  </h4>
                  <p className="text-sm sm:text-base text-inactive">
                    {current.profession}
                  </p>
                </div>
              </div>


              {/* Image */}
              <div className="flex rounded-lg overflow-hidden xl:flex-1 xl:mb-2 w-auto lg:px-0 sm:w-[295px]">
                <img
                  src={current.image}
                  alt={current.name}
                  className=" object-cover  xl:w-[221px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
