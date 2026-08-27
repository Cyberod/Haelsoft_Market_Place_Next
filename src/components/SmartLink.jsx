import Link from 'next/link';
import { isMigrated } from '@/lib/routes';

/**
 * next/link for routes this app owns, a plain <a> for everything still served
 * by the legacy SPA. Client-side navigating into the SPA would request an RSC
 * payload from a route that only returns its HTML shell.
 */
export default function SmartLink({ href, className, children, ...rest }) {
  return isMigrated(href)
    ? <Link href={href} className={className} {...rest}>{children}</Link>
    : <a href={href} className={className} {...rest}>{children}</a>;
}
