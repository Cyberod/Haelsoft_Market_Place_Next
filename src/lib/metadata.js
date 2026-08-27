/**
 * Shared metadata helpers.
 *
 * Two Next behaviours make this worth centralising:
 *
 * 1. Metadata is INHERITED down the segment tree. A `canonical` set in the root
 *    layout would therefore apply to every page that doesn't override it —
 *    which is exactly the bug the live site has today, where index.html
 *    hardcodes a canonical pointing at the homepage and every URL declares
 *    itself a duplicate of "/". So the root layout sets no canonical at all,
 *    and every page supplies its own through buildMetadata().
 *
 * 2. Nested metadata objects are merged SHALLOWLY: a page that defines
 *    `openGraph` replaces the root's entire openGraph block, silently dropping
 *    siteName, locale and type. buildMetadata() re-applies the defaults so a
 *    page only has to state what is specific to it.
 */

export const SITE_URL = 'https://www.haelsoftmarketplace.com';
export const SITE_NAME = 'Haelsoft Marketplace';

/**
 * @param {object}  o
 * @param {string}  o.title        page title (goes through the "%s | Haelsoft" template)
 * @param {string}  o.description
 * @param {string}  o.path         canonical path, e.g. "/pricing" or "/courses/foo"
 * @param {string} [o.image]       absolute image URL (R2 thumbnails already are)
 * @param {string} [o.type]        openGraph type; defaults to "website"
 * @param {boolean}[o.noindex]
 * @param {boolean}[o.absoluteTitle] bypass the "%s | Haelsoft" template, for titles
 *                                   that already carry the brand
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
  noindex = false,
  absoluteTitle = false,
}) {
  const url = `${SITE_URL}${path}`;
  const images = image ? [{ url: image }] : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: 'en_NG',
      ...(images && { images }),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(images && { images }),
    },
    ...(noindex && { robots: { index: false, follow: false } }),
  };
}
