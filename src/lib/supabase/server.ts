import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Standard cookie-based Supabase client. Always returns a client.
 * Throws if env vars are missing. Use for admin routes and authenticated flows.
 */
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component — safe to ignore.
        }
      },
    },
  });
}

/**
 * Safe variant — returns null instead of throwing when env vars are missing.
 * Used by db.ts read functions so the app gracefully falls back to local MDX
 * instead of crashing the entire page when Supabase is not configured.
 */
export async function createClientSafe() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    console.warn(
      '[supabase/server] Missing env vars — Supabase disabled, falling back to local data.'
    );
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component — safe to ignore.
        }
      },
    },
  });
}
