import { getMarketplaceProducts, getCourseSlugs, getFeaturedInstructors } from '@/lib/api';
import { SITE_URL } from '@/lib/metadata';

/**
 * Generated per request and cached, replacing the build-time script that wrote
 * public/sitemap.xml. That script fetched the API during `vite build` and, on
 * failure, wrote a sitemap containing only the static pages while still exiting
 * 0 - a cold backend at build time silently dropped every product and course.
 * Here the URLs come from the same cached API responses the pages use.
 *
 * If any section fails, this throws rather than emitting a partial sitemap:
 * dropping live URLs tells search engines to de-index them, which is worse
 * than serving a slightly stale file. Next then keeps serving the last
 * successfully generated version.
 */
export const revalidate = 3600;

const iso = (d) => (d ? new Date(d) : undefined);

export default async function sitemap() {
  const [products, courses, instructors] = await Promise.all([
    getMarketplaceProducts(),
    getCourseSlugs(),
    getFeaturedInstructors(),
  ]);

  const staticPages = [
    { path: '/',            changeFrequency: 'weekly',  priority: 1.0 },
    { path: '/marketplace', changeFrequency: 'daily',   priority: 0.9 },
    { path: '/features',    changeFrequency: 'monthly', priority: 0.7 },
    { path: '/pricing',     changeFrequency: 'monthly', priority: 0.7 },
    { path: '/HowitWorks',  changeFrequency: 'monthly', priority: 0.6 },
    { path: '/contact',     changeFrequency: 'monthly', priority: 0.5 },
  ].map(({ path, changeFrequency, priority }) => ({
    // Next strips the root's trailing slash when it resolves alternates.canonical,
    // so "/" must be emitted as the bare origin or the sitemap and the canonical
    // disagree on the homepage's URL.
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));

  const productPages = (products.products ?? [])
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${SITE_URL}/marketplace/product/${p.slug}`,
      // The marketplace API returns no updated_at — the old script read that
      // field anyway, so every product's lastmod was really the build date.
      lastModified: iso(p.created_at),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  const coursePages = (courses ?? [])
    .filter((c) => c.slug)
    .map((c) => ({
      url: `${SITE_URL}/courses/${c.slug}`,
      lastModified: iso(c.updated_at),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  // Never previously in any sitemap.  No date field is exposed for
  // instructors, so lastModified is omitted rather than invented.
  const instructorPages = (instructors ?? [])
    .filter((i) => i.profile_slug || i.id)
    .map((i) => ({
      url: `${SITE_URL}/in/${i.profile_slug || i.id}`,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  return [...staticPages, ...coursePages, ...productPages, ...instructorPages];
}
