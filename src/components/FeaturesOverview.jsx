


const featuresData = [
  {
    badge: "Sell Product",
    title: "Sell Your Digital Products",
    description: "Create and sell digital products with ease on our intuitive marketplace platform.",
    items: ["Unlimited uploads", "Global reach", "Instant delivery"],
    bgColor: "#E8F4F8",
  },
  {
    badge: "Payment Solutions",
    title: "Secure Payment Processing",
    description: "Process payments securely with multiple payment gateways and currencies supported.",
    items: ["Multiple currencies", "Instant payouts", "Fraud protection"],
    bgColor: "#FFF4E6",
  },
  {
    badge: "Product Builder",
    title: "Easy Product Creation",
    description: "Build and customize your products without any technical knowledge required.",
    items: ["Drag-and-drop editor", "Templates", "Live preview"],
    bgColor: "#F0E6FF",
  },
  {
    badge: "Engagement Tools",
    title: "Engage Your Audience",
    description: "Keep your audience engaged with powerful engagement tools and analytics.",
    items: ["Comments & reviews", "Community features", "Notifications"],
    bgColor: "#E6F7FF",
  },
  {
    badge: "Affiliate Program",
    title: "Earn Through Affiliates",
    description: "Grow your income by enabling others to promote your products and earn commissions.",
    items: ["Commission tracking", "Affiliate dashboard", "Marketing materials"],
    bgColor: "#F0FFE6",
  },
  {
    badge: "Sales Tools",
    title: "Maximize Your Sales",
    description: "Leverage advanced sales tools to optimize conversions and increase revenue.",
    items: ["Discount codes", "Bundle offers", "Email campaigns"],
    bgColor: "#FFE6F0",
  },
  {
    badge: "Advanced Analysis",
    title: "In-Depth Analytics",
    description: "Gain valuable insights with comprehensive analytics and performance metrics.",
    items: ["Sales reports", "Customer insights", "Performance tracking"],
    bgColor: "#FFF8E6",
  },
  {
    badge: "Security",
    title: "Enterprise Security",
    description: "Your data is protected with industry-leading security standards and compliance.",
    items: ["SSL encryption", "Data backup", "Compliance certified"],
    bgColor: "#E6F9FF",
  },
];

export default function FeaturesOverview() {
  return (
    <div className="py-12 sm:py-16 md:py-20">
      <div className="space-y-12 lg:space-y-24">
        {featuresData.map((feature, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div
              key={index}
              className={`flex flex-col ${
                isEven ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 lg:gap-12 items-center mb-24`}
            >
              {/* Text Content */}
              <div className="flex-1 w-full">
                <div className="px-4 py-2 font-[12px] md:font-[18px] text-section-text bg-section-text-bg rounded-3xl mb-4 w-fit">
                  {feature.badge}
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 md:mb-4">
                  {feature.title}
                </h3>

                <p className="text-base sm:text-lg text-inactive mb-6 md:mb-8 leading-relaxed">
                  {feature.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 md:space-y-3">
                  {feature.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-3">
                      <img
                        src="/checked-icon.svg"
                        alt="checked"
                        className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                      />
                      <span className="text-sm sm:text-base md:text-lg text-black">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div
                className="flex-1 w-full rounded-2xl "
                style={{ backgroundColor: feature.bgColor }}
              >
                <img
                  src="/marketImage.png"
                  alt={feature.title}
                  className="w-full lg:w-[498px]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
