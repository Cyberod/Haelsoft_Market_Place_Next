import { isMigrated } from '@/lib/routes';
import Link from 'next/link';

/**
 * `buttonLink` is passed as "" by five of the six callers in the SPA, which
 * renders a link to the current page. That behaviour is preserved verbatim
 * here rather than silently repointed — see the note in the port commit.
 */
function CallToAction({ title, description, buttonText, buttonLink }) {
  const buttonClass =
    'inline-block bg-linear-to-t from-haelsoft-primary from-36% to-haelsoft-secondary text-white font-semibold px-8 py-3 rounded-3xl hover:opacity-90 transition-opacity relative z-10';

  return (
    <div className="w-full mx-auto lg:px-[100px] py-15 ">
      <div
        className="bg-[#FFEDE6] h-auto  py-[115px] px-[23px] lg:py-[80px] lg:px-[175px] text-center rounded-3xl z-10 relative overflow-hidden"
        style={{ backgroundImage: "url('/strokes.svg')" }}
      >
        <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-4 relative z-10 leading-[49px] lg:leading-[65px]">
          {title}
        </h2>
        <p className="text-inactive text-lg md:text-xl leading-auto mb-[50px] relative z-10 flex justify-center">
          {description}
        </p>
        {isMigrated(buttonLink) ? (
          <Link href={buttonLink} className={buttonClass}>{buttonText}</Link>
        ) : (
          <a href={buttonLink} className={buttonClass}>{buttonText}</a>
        )}
      </div>
    </div>
  );
}

export default CallToAction;
