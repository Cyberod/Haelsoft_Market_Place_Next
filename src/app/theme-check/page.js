// Temporary theme verification harness (Step 1.1), kept at /theme-check so it
// no longer shadows "/" — with no page at the root, "/" now falls through to
// the legacy SPA via the fallback rewrite. Delete before the Phase 6 cutover.
export const metadata = { robots: { index: false, follow: false } };

export default function ThemeCheck() {
  return (
    <main className="frame font-inter py-15">
      <h1 className="text-haelsoft-primary leading-17.5 text-4xl font-bold">
        Theme check
      </h1>
      <p className="text-inactive leading-11">Inter via next/font</p>

      <div className="bg-haelsoft-secondary text-active p-4.5 mt-6.25">secondary / active</div>
      <div className="bg-grey text-section-text mt-3.25 p-3.20">grey / section-text</div>
      <div className="bg-section-text-bg mt-10.5 h-25.5 w-82">section-text-bg</div>
      <div className="bg-white mt-15.5 h-20.25 w-100">white</div>

      <div className="hidden xs:block sm:block md:block lg:block xl:block 2xl:block 3xl:block">
        breakpoints xs..3xl
      </div>

      <div className="mt-45 mb-58\.5 pt-17.5 pb-22.5 ml-25 mr-125 h-9 w-11">spacing scale</div>

      <div className="carousel-track">
        <div className="carousel-item">carousel</div>
      </div>
      <div className="flex"><span className="payment-line" /></div>
      <div className="footer-divider" />
      <div className="scrollbar-hide animate-scroll">utilities</div>
    </main>
  );
}
