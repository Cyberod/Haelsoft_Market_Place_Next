'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "What is the difference between the Starter, Growth, and Premium plans?",
    answer: "The Starter plan is free with basic features, the Growth plan offers advanced analytics and lower fees for $99.99/month, and the Premium plan provides the most features including custom branding and same-day payouts for $29.99/month."
  },
  {
    question: "How do I get paid for my sales?",
    answer: "You can receive payouts via Bank Transfer, PayPal, Crypto, or Mobile Money. Premium plan users get same-day withdrawals, while other plans have standard processing times."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No hidden fees! We have transparent pricing with only listing fees (0% for all plans) and transaction fees that vary by plan. All fees are clearly displayed."
  },
  {
    question: "Can I change my pricing plan anytime?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated accordingly."
  },
  {
    question: "What payment methods do you accept for subscriptions?",
    answer: "We accept all major credit cards, PayPal, bank transfers, and mobile money payments across African countries."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! The Starter plan is completely free and allows you to test the platform with basic features. You can upgrade anytime."
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer: "If you exceed your plan limits, you'll be notified and can upgrade your plan. There's no automatic suspension, but some features may be limited until you upgrade."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription anytime from your account settings. You'll retain access until the end of your billing period, and we don't charge cancellation fees."
  }
];

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
          {openIndex === index && (
            <div className="mt-3 text-inactive text-base lg:text-xl leading-6 text-left">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
