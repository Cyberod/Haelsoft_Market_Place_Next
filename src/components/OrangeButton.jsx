import Link from 'next/link';
import { isMigrated } from '@/lib/routes';

export default function OrangeButton({ text, to, href, className = '' }) {
  const cls = `w-full md:w-auto bg-linear-to-t from-haelsoft-primary from-36% to-haelsoft-secondary text-white px-6 py-3 rounded-xl text-sm sm:text-base md:text-[16px] font-semibold cursor-pointer text-center inline-block ${className}`;

  if (to) {
    return isMigrated(to)
      ? <Link href={to} className={cls}>{text}</Link>
      : <a href={to} className={cls}>{text}</a>;
  }
  // Callers that pass neither `to` nor `href` fall through to "#", as in the SPA.
  return <a href={href || '#'} className={cls}>{text}</a>;
}
