'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isMigrated } from '@/lib/routes';

/**
 * next/link with react-router NavLink's active semantics, so the ported markup
 * keeps behaving identically:
 *   end=true  -> exact match only (used for "/", which would otherwise match
 *                every route)
 *   end=false -> exact match, or a match at a path-segment boundary
 *
 * The active/inactive classes are passed as plain strings rather than
 * react-router's className({ isActive }) callback: this is a client component,
 * and a server component like <Footer> cannot pass a function across the
 * boundary.
 *
 * Routes not yet owned by this app render a plain <a> so the browser performs a
 * real navigation into the legacy SPA instead of asking for an RSC payload.
 */
export default function ActiveLink({
  href,
  end = false,
  className = '',
  activeClassName = '',
  inactiveClassName = '',
  children,
  ...rest
}) {
  const pathname = usePathname();
  const isActive = end
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  const resolved = [className, isActive ? activeClassName : inactiveClassName]
    .filter(Boolean)
    .join(' ');

  if (!isMigrated(href)) {
    return (
      <a href={href} className={resolved} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={resolved} {...rest}>
      {children}
    </Link>
  );
}
