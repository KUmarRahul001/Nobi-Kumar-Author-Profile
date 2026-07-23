/**
 * src/app/not-found.tsx
 * Custom 404 page for Next.js App Router
 */
import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-serif font-black text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-serif font-bold mb-2">Page Not Found</h2>
      <p className="text-sm text-neutral-400 max-w-md mb-8">
        The story chapter or page you are searching for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-mono text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-900/30"
      >
        Return to Home
      </Link>
    </div>
  );
}
