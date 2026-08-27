import OrangeButton from "./OrangeButton";

const cards = [
  {
    image: "/marketImage.png",
    title: "Sell Any Type of Digital Product",
    description: "Monetise your expertise with multiple selling options",
    bgColor: "bg-[#FFF0EB]",
  },
  {
    image: "/marketImage.png",
    title: "Offer Professional Services",
    description: "Connect with clients and deliver your services seamlessly",
    bgColor: "bg-[#E8F8F5]",
  },
  {
    image: "/marketImage.png",
    title: "Create & Sell Courses",
    description: "Share your knowledge and build a loyal student base",
    bgColor: "bg-[#FEF7FF]",
  },
  {
    image: "/marketImage.png",
    title: "Launch Subscription Plans",
    description: "Generate recurring income with flexible subscription options",
    bgColor: "bg-[#FFF9EB]",
  },
];

export default function MarketplaceCards() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5 lg:px-[100px] xl:px-[180px] 2xl:px-[260px] mt-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} rounded-2xl p-6 sm:p-8 flex flex-col gap-3`}
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full  rounded-xl object-cover"
            />
            <h3 className="font-semibold text-lg sm:text-xl text-black">
              {card.title}
            </h3>
            <p className="text-sm sm:text-base text-inactive leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <OrangeButton text="See More" to="/marketplace" />
      </div>
    </div>
  );
}
