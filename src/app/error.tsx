'use client';

import * as React from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    // Unhandled runtime error hook
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-6 text-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-serif font-bold text-crimson">Something went wrong</h2>
        <p className="text-muted font-sans max-w-md mx-auto text-sm md:text-base">
          An unexpected error occurred while rendering this page. The shadows have temporarily
          obscured the path.
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="px-5 py-2.5 rounded text-xs font-mono uppercase font-semibold bg-crimson text-white hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-crimson"
      >
        Try again
      </button>
    </div>
  );
}
