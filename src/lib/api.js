/**
 * Server-side API client for the public (unauthenticated) endpoints.
 *
 * This is deliberately NOT a port of the SPA's src/services/api.js. That client
 * carries access tokens, a refresh queue and 401 retry logic, none of which
 * belong on the server: every endpoint used here is public, so nothing is
 * fetched on behalf of a signed-in user and no credentials are ever forwarded.
 * Authenticated calls stay in the browser, in client components, using the
 * existing SPA client.
 *
 * Caching strategy — this is the Render cold-start mitigation:
 * The API runs on Render's free tier and sleeps after ~15 minutes idle, taking
 * 30-50s to wake. Pages therefore use ISR (`next.revalidate`) rather than
 * per-request SSR. Once a page has been rendered, revalidation happens in the
 * background and a slow or failed refresh keeps serving the last good HTML,
 * so a sleeping backend can never block a user-facing render or a crawler.
 * `fetchWithRetry` covers the remaining case — the very first render of a page
 * with nothing cached yet — by absorbing one cold start.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://haelsoft-marketplace-api.onrender.com/api/v1';

// Revalidation windows, in seconds. Listings move more often than detail pages.
export const REVALIDATE = {
  listing: 300,   // 5 min  — marketplace grid, featured rows
  detail: 600,    // 10 min — a single course/product/instructor
  sitemap: 3600,  // 1 hour — slug inventory
};

const TIMEOUT_MS = 25_000;
const ATTEMPTS = 2; // the first request may only serve to wake a sleeping dyno

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function fetchWithRetry(url, init) {
  let lastErr;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, {
        ...init,
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { Accept: 'application/json' },
      });

      // 4xx is a real answer, not a transient failure — don't burn a retry on it.
      if (!res.ok) {
        let detail = `HTTP ${res.status}`;
        try {
          const body = await res.json();
          detail = body.error || body.detail || detail;
        } catch {
          /* non-JSON error body; keep the status line */
        }
        throw new ApiError(detail, res.status);
      }

      return await res.json();
    } catch (err) {
      if (err instanceof ApiError) throw err;
      lastErr = err;
    }
  }
  throw new ApiError(
    `Request to ${url} failed after ${ATTEMPTS} attempts: ${lastErr?.message}`,
    503,
  );
}

function get(endpoint, { revalidate = REVALIDATE.listing, tags } = {}) {
  return fetchWithRetry(`${API_BASE_URL}${endpoint}`, {
    next: { revalidate, ...(tags && { tags }) },
  });
}

function qs(params = {}) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') q.set(k, String(v));
  }
  const s = q.toString();
  return s ? `?${s}` : '';
}

/* ── Courses ─────────────────────────────────────────────────────────────── */

export async function getFeaturedCourses() {
  const data = await get('/courses/public/featured/', { revalidate: REVALIDATE.listing });
  return data.courses ?? [];
}

export async function getPublicCourses({ search } = {}) {
  const data = await get(`/courses/public/${qs({ search })}`, {
    revalidate: REVALIDATE.listing,
  });
  return { courses: data.courses ?? [], count: data.count ?? 0 };
}

export async function getPublicCourse(slug) {
  const data = await get(`/courses/public/${slug}/`, { revalidate: REVALIDATE.detail });
  return data.course ?? data;
}

export async function getCourseSlugs() {
  const data = await get('/courses/sitemap/', { revalidate: REVALIDATE.sitemap });
  return data.courses ?? [];
}

/* ── Marketplace ─────────────────────────────────────────────────────────── */

export async function getMarketplaceProducts(params = {}) {
  const data = await get(
    `/marketplace/${qs({
      search: params.search,
      type: params.type,
      min_price: params.minPrice,
      max_price: params.maxPrice,
    })}`,
    { revalidate: REVALIDATE.listing },
  );
  return { products: data.products ?? [], count: data.count ?? 0 };
}

export async function getProductDetail(slug) {
  const data = await get(`/marketplace/${slug}/`, { revalidate: REVALIDATE.detail });
  return data.product ?? data;
}

/* ── Instructors ─────────────────────────────────────────────────────────── */

// Note: this endpoint returns a bare array, unlike every other public endpoint,
// which wraps its payload in a { success, <key> } envelope.
export async function getFeaturedInstructors() {
  const data = await get('/instructors/featured/', { revalidate: REVALIDATE.listing });
  return Array.isArray(data) ? data : (data.instructors ?? []);
}

// `id` and `profile_slug` are the same value upstream, so /in/:slug and
// /profile/:instructorId both resolve through this one call.
export async function getInstructorProfile(idOrSlug) {
  const data = await get(`/instructors/${idOrSlug}/`, { revalidate: REVALIDATE.detail });
  return data.instructor ?? data;
}
