'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-white flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h2 className="text-3xl font-serif font-bold text-red-600 mb-2">Something went wrong</h2>
        <p className="text-neutral-400 text-sm max-w-md mb-6">
          An unexpected error occurred in the application shell.
        </p>
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded text-xs font-mono uppercase font-semibold bg-red-700 text-white hover:bg-red-800 transition-colors"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
