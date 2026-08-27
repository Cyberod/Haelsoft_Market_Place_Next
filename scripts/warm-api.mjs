/**
 * Wakes the API before the build starts fetching.
 *
 * Render's free tier spins down after ~15 minutes idle and takes 30-50s to
 * come back. Prerendering fans out immediately across every course, product
 * and profile page, so a build that starts against a sleeping dyno fails with
 * connect timeouts before it wakes — three builds during this migration died
 * that way. One warm-up request up front removes the race.
 *
 * Never fails the build: if the API cannot be reached, the build proceeds and
 * the API client's own retries and concurrency limit take over.
 */
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://haelsoft-marketplace-api.onrender.com/api/v1';
const HEALTH = `${API_BASE.replace(/\/api\/v1\/?$/, '')}/api/health/`;

const ATTEMPTS = 6;
const TIMEOUT_MS = 20_000;
const GAP_MS = 5_000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const started = Date.now();
for (let i = 1; i <= ATTEMPTS; i++) {
  try {
    const res = await fetch(HEALTH, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (res.ok) {
      console.log(`[warm-api] API awake after ${((Date.now() - started) / 1000).toFixed(1)}s (attempt ${i})`);
      process.exit(0);
    }
    console.warn(`[warm-api] attempt ${i}/${ATTEMPTS}: HTTP ${res.status}`);
  } catch (err) {
    console.warn(`[warm-api] attempt ${i}/${ATTEMPTS}: ${err.message}`);
  }
  if (i < ATTEMPTS) await sleep(GAP_MS);
}
console.warn('[warm-api] API did not respond; continuing anyway — the API client will retry.');
process.exit(0);
