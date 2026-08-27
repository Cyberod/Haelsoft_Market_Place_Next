'use client';

import { useState } from 'react';

import { faqs } from '@/lib/faqs';


export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto px-5 lg:px-[157px] mt-10 font-inter">
      {faqs.map((faq, index) => (
        <div key={index} className={`border-b border-grey p-4 ${openIndex === index ? 'bg-gray-50' : ''}`}>
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center text-left cursor-pointer"
          >
            <span className="font-medium text-lg md:text-xl pr-4">{faq.question}</span>
            <span className="text-base lg:text-2xl font-bold flex-shrink-0">
              {openIndex === index ? '-' : '+'}
            </span>
          </button>
          {/* Always rendered so the answer is in the HTML; hidden with CSS
              when collapsed. Visual behaviour is unchanged. */}
          <div className={`mt-3 text-inactive text-base lg:text-xl leading-6 text-left ${openIndex === index ? '' : 'hidden'}`}>
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
