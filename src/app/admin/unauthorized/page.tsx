/**
 * src/app/admin/unauthorized/page.tsx
 * Shown when a logged-in user is not in the admin whitelist
 */
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      <div className="text-center max-w-sm space-y-6">
        <div className="text-6xl">🚫</div>
        <h1 className="text-3xl font-serif font-black text-white">Access Denied</h1>
        <p className="text-sm text-white/40">
          Your account is not authorised to access the admin panel. Contact the site owner if you
          believe this is an error.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-xl border border-white/10 transition-all"
        >
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
