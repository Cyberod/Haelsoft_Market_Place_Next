import { SITE_URL } from '@/lib/metadata';

/**
 * Replaces the static public/robots.txt. Same allow/disallow rules as the SPA,
 * with the sitemap now pointing at the route Next generates.
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/marketplace', '/features', '/pricing', '/HowitWorks', '/contact'],
        disallow: [
          '/dashboard/',
          '/signup/',
          '/login/',
          '/forgot-password/',
          '/verify-otp/',
          '/onboarding/',
          '/checkout/',
          '/payment/',
          // migration-only page; removed before cutover
          '/theme-check',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
