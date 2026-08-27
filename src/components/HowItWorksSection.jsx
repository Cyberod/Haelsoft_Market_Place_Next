'use client';

import { useState } from 'react';
import OrangeButton from './OrangeButton';

export default function HowItWorksSection({ section }) {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (stepNumber) => {
    setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
  };

  return (
    <div className="mb-20 md:mb-32">
      {/* Section Layout */}
      <div className={`flex flex-col ${section.imagePosition === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 lg:gap-16 items-center`}>
        
        {/* Content */}
        <div className="w-full md:w-1/2">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="">
              <span className="py-[10px] px-4 font-[18px] text-section-text bg-section-text-bg rounded-3xl mb-3.25">
                {section.badge}
              </span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-inter mt-4">
            {section.title}
          </h2>

          {/* Steps Accordion */}
          <div className="mb-8 relative">
            {/* Dashed vertical line spanning all steps */}
            <div className="absolute left-4 top-4 bottom-10 w-0.5 border-l-2 border-dashed border-[#D1D1D1] pointer-events-none"></div>

            {section.steps.map((step, stepIndex) => (
              <div key={step.number} className="flex gap-4 pb-6 relative">

                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-8 h-8 flex items-center justify-center font-bold rounded-full text-sm transition-all ${
                      expandedStep === step.number
                        ? 'bg-haelsoft-primary text-white'
                        : 'bg-white border-2 border-dashed border-[#D1D1D1] text-haelsoft-primary'
                    }`}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0" cursor-pointer>
                  {/* Step Header */}
                  <button
                    onClick={() => toggleStep(step.number)}
                    className="w-full flex items-center justify-between pb-4 border-b border-gray-200 hover:border-orange-300 transition-colors text-left cursor-pointer"
                  >
                    <span className="text-lg font-semibold text-gray-900">
                      {step.title}
                    </span>
                    <img
                      src="/dropdown.svg"
                      alt="dropdown"
                      className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                        expandedStep === step.number ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Step Substeps — always in the DOM, hidden when collapsed,
                      so the 36 substeps are visible to crawlers. */}
                  <div className={`pt-4 ${expandedStep === step.number ? '' : 'hidden'}`}>
                      <ul className="space-y-3">
                        {step.substeps.map((substep, substepIndex) => (
                          <li
                            key={substepIndex}
                            className="flex items-start gap-3"
                          >
                            <img
                              src="/primary-checked.svg"
                              alt="checked"
                              className="w-5 h-5 flex-shrink-0 mt-0.5"
                            />
                            <span className="text-gray-700 text-base leading-relaxed">
                              {substep}
                            </span>
                          </li>
                        ))}
                      </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
{/*           <button className="w-full md:w-auto px-8 py-3 bg-haelsoft-primary hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors">
            {section.button}
          </button> */}
      <div className="mt-10 ">
        <OrangeButton text={section.button} />
      </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex-shrink-0">
          <img
            src={section.image}
            alt={section.title}
            className="w-full object-cover lg:w-[556px]  rounded-lg"
          />
        </div>


      </div>
    </div>
  );
}
