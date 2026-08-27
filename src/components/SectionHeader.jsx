export default function SectionHeader({ badge, title, description }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center">
        <p className="py-[10px] px-4 font-[18px] text-section-text bg-section-text-bg rounded-3xl mb-3.25">{badge}</p>
        <span className="text-[32px] sm:text-[33px] md:text-[38px] lg:text-[48px] font-bold lg:leading-17.5 leading-10 lg:leading-auto xl:px-[10px]">{title}</span>
        <p className="font-[18px] md:font-[20px] text-inactive xl:leading-8 xl:tracking-[0.5px] mt-4 max-w-2xl">{description}</p>
      </div>
    </>
  );
}
