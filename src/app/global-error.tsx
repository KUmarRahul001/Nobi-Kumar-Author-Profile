/**
 * src/app/global-error.tsx
 * App Router Global Error Handler
 */
'use client';

import * as React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-serif font-bold text-red-600 mb-4">Something went wrong</h1>
        <p className="text-sm text-neutral-400 max-w-md mb-6">
          {error.message || 'An unexpected error occurred while loading this page.'}
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white font-mono text-xs font-semibold uppercase tracking-wider rounded-xl transition-all"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
