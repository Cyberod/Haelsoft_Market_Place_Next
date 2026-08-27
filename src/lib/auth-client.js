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
 * Anything requiring a bearer token stays on the legacy SPA.
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
