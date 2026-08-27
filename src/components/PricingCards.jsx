'use client';

import { useState } from 'react';


const getPlans = (billingCycle) => [
  {
    name: 'Starter Plan',
    price: billingCycle === 'monthly' ? 'Free' : 'Free',
    audience: 'Perfect for beginners who want to test the platform and start selling',
    icon: '/starter-icon.svg',
    features: [
      { text: '0% Listing Fee – List unlimited courses &amp; products', included: true },
      { text: '20% Transaction Fee per sale', included: true },
      { text: 'Access to basic analytics', included: true },
      { text: 'Payouts via Bank Transfer, PayPal, Crypto, Mobile Money', included: true },
      { text: 'No custom branding', included: false },
      { text: 'Limited marketing & promotional tools', included: false },
    ],
    ideal_for: 'New educators & small content creators who want to start selling with no upfront cost.'

  },
  {
    name: 'Premium Plan',
    price: billingCycle === 'monthly' ? '$29.99' : '$290.99',
    audience: 'For established educators and institutions looking for the best features, lowest fees, and maximum revenue potential.',
    icon: '/premium-icon.svg',
    features: [
      { text: '0% Listing Fee – Sell unlimited products & services', included: true },
      { text: '5% Transaction Fee per sale', included: true },
      { text: 'Full Analytics Dashboard (Sales, Engagement, and Student Insights)', included: true },
      { text: 'Custom Website & Domain Integration', included: true },
      { text: 'Premium Marketing & Ads Support', included: true },
      { text: 'VIP Payouts (Same-Day Withdrawals)', included: true },
      { text: 'Exclusive Partner Promotions & Featured Listings', included: true },

    ],
    ideal_for: 'Large education businesses, institutions, and full-time content creators looking for premium features and branding.'

  },
  {
    name: 'Growth Plan',
    price: billingCycle === 'monthly' ? '$99.99' : '$990.99',
    audience: 'Designed for serious educators who want advanced features and lower transaction fees.',
    icon: '/growth-icon.svg',
    features: [
      { text: '0% Listing Fee – Sell unlimited courses, digital products & services', included: true },
      { text: '10% Transaction Fee per sale', included: true },
      { text: 'Advanced Analytics & Sales Reports', included: true },
      { text: 'Custom Branding – Your logo & course branding', included: true },
      { text: 'Marketing & Promo Tools (Coupons, Discounts, Email Campaigns)', included: true },
      { text: 'Affiliate & Referral Program Access', included: true },
      { text: 'Priority Payout Processing', included: true }

    ],
    ideal_for: 'New educators & small content creators who want to start selling with no upfront cost.'

  }
];

export default function PricingCards({ billingCycle }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const plans = getPlans(billingCycle);

  return (
    <div className="max-w-full frame font-inter px-5 flex flex-col lg:flex-row lg:justify-between  space-y-9 lg:space-x-9 lg:space-y-0 mt-16 mb-[186px] lg:mb-[188px]">
      {plans.map((plan, index) => (
        <div
          key={plan.name}
          onClick={() => setSelectedPlan(index)}
          className={`flex flex-col max-w-sm p-6 border cursor-pointer transition-all duration-300 min-h-100 lg:min-h-125 ${
            selectedPlan === index
              ? 'border-2 border-haelsoft-primary scale-110 bg-gray-50'
              : 'border-grey'
          } rounded-xl`}
        >
          <div className={`flex mb-4 ${plan.name === 'Premium Plan' ? 'flex-col xl:flex-row xl:justify-between xl:items-center' : 'items-center'}`}>
            <div className="flex items-center">
              <img src={plan.icon} alt={`${plan.name} icon`} className="w-8 h-8 mr-3 mb-4 xl:mb-0" />
              <h3 className="text-xl font-medium">{plan.name}</h3>
              </div>
              {plan.name === 'Premium Plan' && (
              <span className="text-haelsoft-primary bg-[#FFF8F5] border-2 border-[#FFE5DB] px-2 py-1 rounded-xl text-[12px] md:text-[8px] font-normal mt-4 lg:mt-0 self-start">
              Recommended
              </span>
              )}
              </div>
          <p className="text-left text-2xl font-bold mb-2">
            {plan.price}
            {plan.price !== 'Free' && <span className="text-inactive text-xs md:text-sm font-normal"> billed {billingCycle}</span>}
          </p>
          <p className="text-left text-sm text-inactive mb-4">{plan.audience}</p>
          <ul className="mb-6 text-xs md:text-sm text-left">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center mb-2">
                 <img
                   src={feature.included ? '/checked-icon.svg' : '/checkedout-icon.svg'}
               alt={feature.included ? 'check' : 'cross'}
              className="w-4 h-4 mr-2"
              />
                <span className={feature.included ? 'text-black' : 'text-gray-400'}>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-left md:text-sm text-inactive mt-3.5 mb-6"><strong>Ideal For:</strong>{plan.ideal_for}</p>
          <button className={`w-full py-2 rounded-lg cursor-pointer mt-auto ${
          selectedPlan === index
              ? 'bg-linear-to-t from-haelsoft-primary from-36% to-haelsoft-secondary text-white'
              : 'bg-grey text-black'
          }`}>
            Get Started
          </button>
        </div>
      ))}
    </div>
  );
}
