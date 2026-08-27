/**
 * Which routes this app actually owns.
 *
 * During the migration most paths are still served by the legacy SPA through
 * the fallback rewrite in next.config.mjs. next/link would try to client-side
 * navigate to those, asking for an RSC payload from a route that only returns
 * the SPA's HTML shell. Rendering a plain <a> instead forces a normal browser
 * navigation, which is what actually loads the SPA.
 *
 * Add a path here in the same commit that adds its page.js, and its links
 * upgrade to client-side navigation automatically.
 */
export const MIGRATED_ROUTES = [
  '/features',       // Step 3.1
  '/pricing',        // Step 3.2
  '/HowitWorks',     // Step 3.3
  '/contact',        // Step 3.4
  '/marketplace',    // Step 4.1
  '/courses',        // Step 4.3
  // '/',            // Step 4.5
];

/**
 * Paths nested under a migrated prefix that are still served by the SPA.
 * "/courses" owns /courses/<slug>, but /courses/<slug>/learn (the player) and
 * /courses/<slug>/checkout are not migrated, so a prefix match alone would
 * wrongly send next/link at them.
 */
const LEGACY_SUFFIXES = ['/learn', '/checkout'];

export function isMigrated(href) {
  if (typeof href !== 'string' || !href.startsWith('/')) return false;
  const path = href.split(/[?#]/)[0];
  if (LEGACY_SUFFIXES.some((suffix) => path.endsWith(suffix))) return false;
  return MIGRATED_ROUTES.some((r) => path === r || (r !== '/' && path.startsWith(`${r}/`)));
}
