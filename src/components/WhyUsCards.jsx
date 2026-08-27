const cards = [
  { icon: '/growth.png', title: 'No Hidden Fees', desc: 'Transparent pricing with no surprises' },
  { icon: '/bulb.png', title: 'Innovative Platform', desc: 'Cutting-edge tools for modern creators' },
  { icon: '/target.png', title: 'Targeted Reach', desc: 'Connect with your ideal audience' },
  { icon: '/thumbs.png', title: 'Trusted Service', desc: 'Reliable and user-friendly experience' },
];

export default function WhyUsCards() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 space-x-10 mt-10">
      {cards.map((card, index) => (
        <div key={index} className="w-full bg-white rounded-xl p-6 pb-3 h-auto shadow-sm">
          <div className="bg-[#FFFBFA] px-4 py-10 sm:px-5 sm:py-10  lg:px-30 lg:py-12 rounded-lg   h-[275px] mb-4">
            <div className="bg-white rounded-lg flex items-center  justify-center  h-[181px] mb-4">
             <img src={card.icon} alt={card.title} className="w-18 h-18 lg:w-24 lg:h-24 flex" />

            </div>
          </div>
          <div className="flex items-start text-left pt-2 pb-6 flex-col gap-3">
            <div className="text-inactive rounded-full px-6 py-2  mr-4 font-bold text-sm shadow-[0_0_10px_rgba(0,0,0,0.25)]">{index + 1}</div>
            <div>
              <h3 className="font-bold text-base mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
