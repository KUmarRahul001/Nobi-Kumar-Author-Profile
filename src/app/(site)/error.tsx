'use client';

import * as React from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('[Site Error]', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-background text-foreground">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-5 rounded-2xl bg-crimson/10 border border-crimson/30 text-crimson">
            <AlertTriangle className="w-10 h-10" />
          </div>
        </div>
        <span className="block text-[10px] font-mono text-crimson uppercase tracking-widest font-bold">
          NNU ARCHIVE — PAGE ERROR
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-black uppercase text-foreground tracking-tight">
          Archive Page Unavailable
        </h1>
        <p className="text-muted text-xs sm:text-sm leading-relaxed font-sans max-w-sm mx-auto">
          This page encountered an error while loading classified data. Please try reloading or
          return to the main archive.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-crimson hover:bg-crimson/90 text-white transition-all shadow-lg"
          >
            <RotateCcw size={14} /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border border-border/80 bg-neutral-900/80 hover:bg-neutral-800 text-foreground transition-all"
          >
            <Home size={14} /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
