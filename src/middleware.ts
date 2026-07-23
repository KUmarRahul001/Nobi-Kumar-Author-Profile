import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase());

// Public admin paths — never blocked
const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/unauthorized'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session token on every request
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check both Supabase user session and DB admin cookie session
  const adminCookie = request.cookies.get('admin_session')?.value;
  const loggedInEmail = user?.email || adminCookie;
  const isAuthenticated = Boolean(
    loggedInEmail && ADMIN_EMAILS.includes(loggedInEmail.toLowerCase())
  );

  // ─── Guard: /admin/** ──────────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    // Always allow login + unauthorized pages through
    if (PUBLIC_ADMIN_PATHS.includes(pathname)) {
      // If already authenticated admin visiting login → redirect to dashboard
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return response;
    }

    // Not authenticated or email not in whitelist → send to login
    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
