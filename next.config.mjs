/**
 * Strangler-fig proxy config.
 *
 * Production (www.haelsoftmarketplace.com) currently runs the Vite SPA on
 * Cloudflare Pages. LEGACY_ORIGIN points at that project's own stable hostname
 * rather than the production domain, so that once this app takes over the
 * domain the fallback still resolves to the SPA instead of looping back here.
 *
 * `fallback` rewrites are evaluated last — after public/ files, static pages
 * and dynamic routes (see Next routing order, step 8). So any route this app
 * implements wins, and everything it does not yet implement is transparently
 * proxied to the SPA. That is what makes the migration page-by-page: today
 * this app owns no public routes, so the site behaves exactly as it does now.
 */
const LEGACY_ORIGIN = 'https://haelsoft-market-place.pages.dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next allows each page 60s to prerender (config-shared.js default), then
  // abandons and retries the whole page. The API runs on a Render free dyno
  // whose cold start is 30-50s, so src/lib/api.js retries with backoff across
  // up to ~197s — which the 60s cap would cut off mid-retry, wasting the
  // backoff and re-running the page from scratch. Raised so the two agree.
  staticPageGenerationTimeout: 240,

  images: {
    // Course/product thumbnails and seller avatars are served from Cloudflare R2.
    // Next 16 removed `images.domains`; remotePatterns is the supported form.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-b0ce30e9f3b44b83bd3008f0afa20b32.r2.dev',
        pathname: '/media/**',
      },
    ],
  },

  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: `${LEGACY_ORIGIN}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
