'use client';

import { useState } from 'react';
import SectionHeader from './SectionHeader';
import PricingCards from './PricingCards';

/**
 * The billing toggle and the cards sit in different branches of the page's DOM,
 * so the whole section becomes the client island rather than lifting state
 * through the page. Keeps the markup structure byte-identical to the SPA while
 * leaving the rest of /pricing as server-rendered HTML.
 */
export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="mt-20 text-center font-inter flex flex-col items-center frame ">
      <div className='px-5 sm:px-10 md:px-20 lg:px-25 xl:px-45 2xl:px-58.5 flex flex-col items-center'>
        <SectionHeader
          badge="Our Pricing Plans"
          title="We offer three flexible pricing options to suit your needs"
          description="Whether you are an independent educator or a large training organization."
        />

        {/* prices */}
        <div className="w-full flex justify-center mt-10">
          <div className="flex border border-grey rounded-2xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 px-6 py-2 text-sm font-medium cursor-pointer  ${
                billingCycle === 'monthly'
                  ? 'bg-black text-white rounded-2xl border border-black'
                  : 'bg-white text-black '
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`flex-1 px-6 py-2 text-sm font-medium cursor-pointer ${
                billingCycle === 'yearly'
                  ? 'bg-black text-white rounded-2xl border border-black'
                  : 'bg-white text-black'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <PricingCards billingCycle={billingCycle} className="" />
    </div>
  );
}
