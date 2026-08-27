'use client';

/**
 * Minimal browser-side auth helpers for the migrated pages.
 *
 * The SPA keeps its access token in module memory, which does not exist on a
 * Next-rendered page. That is fine for everything the public pages need:
 *  - the display identity is mirrored into localStorage('user') by the SPA
 *  - /auth/logout/ is permission_classes = [AllowAny] and reads the refresh
 *    token from the HttpOnly cookie, so it needs no Authorization header
 *
 * Course pages additionally need authenticated calls (enrollment status,
 * enrolling, gated lesson content). The access token is obtainable the same way
 * the SPA gets it after a reload: POST /auth/token/refresh/ with the HttpOnly
 * refresh cookie, which is permission_classes = [AllowAny] and returns a fresh
 * access token. So this module mirrors the SPA's silentRefresh() — token held in
 * module memory only, never persisted, cleared on reload.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://haelsoft-marketplace-api.onrender.com/api/v1';

export function readStoredUser() {
  try {
    const raw = window.localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    // Private mode, disabled storage, or corrupt JSON — treat as signed out.
    return null;
  }
}

export async function logout() {
  try {
    await fetch(`${API_BASE_URL}/auth/logout/`, {
      method: 'POST',
      credentials: 'include', // sends the HttpOnly refresh cookie
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
  } catch {
    // Proceed with local cleanup even if the network call fails —
    // same behaviour as the SPA client.
  }
  try {
    window.localStorage.removeItem('user');
  } catch {
    /* ignore */
  }
}


/* ── Authenticated calls ──────────────────────────────────────────────────── */

let _accessToken = null;
let _refreshing = null; // in-flight refresh, so concurrent callers share one request

async function silentRefresh() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      credentials: 'include', // the HttpOnly refresh cookie
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
    if (!res.ok) return null;
    const data = await res.json();
    _accessToken = data.access ?? null;
    return _accessToken;
  } catch {
    return null;
  }
}

function getToken() {
  if (_accessToken) return Promise.resolve(_accessToken);
  if (!_refreshing) {
    _refreshing = silentRefresh().finally(() => { _refreshing = null; });
  }
  return _refreshing;
}

/**
 * fetch with a bearer token, refreshing once on 401 — the same contract as the
 * SPA's request(). Returns the parsed body; throws { status, message } on error.
 */
export async function authedFetch(endpoint, options = {}) {
  const call = async (token) => {
    const isForm = options.body instanceof FormData;
    return fetch(`${API_BASE_URL}${endpoint}`, {
      credentials: 'include',
      ...options,
      headers: {
        ...(!isForm && { 'Content-Type': 'application/json' }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });
  };

  let res = await call(await getToken());
  if (res.status === 401) {
    _accessToken = null;
    const fresh = await getToken();
    if (fresh) res = await call(fresh);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw { status: res.status, message: data.detail || data.error || 'Request failed' };
  }
  return data;
}

/** Raw response (not JSON) for lesson file downloads. */
export async function authedFetchRaw(url) {
  const token = await getToken();
  const res = await fetch(url, {
    credentials: 'include',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw { status: res.status, message: 'Download failed' };
  return res;
}

/** Fetches an auth-protected file as a Blob (lesson PDFs). */
export async function fetchBlob(url) {
  const res = await authedFetchRaw(url);
  return res.blob();
}
