import * as React from 'react';

export default function Loading() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[50vh] px-6 space-y-4"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="relative w-12 h-12">
        {/* Outer pulsing ring */}
        <div className="absolute inset-0 rounded-full border-2 border-crimson/20 animate-ping" />
        {/* Inner spinning border */}
        <div className="absolute inset-0 rounded-full border-2 border-t-crimson border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      <p className="text-xs font-mono uppercase tracking-widest text-muted animate-pulse">
        Retrieving archives...
      </p>
    </div>
  );
}
