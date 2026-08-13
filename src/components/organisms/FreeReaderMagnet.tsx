import * as React from 'react';
import Link from 'next/link';

export default function FreeReaderMagnet() {
  return (
    <section className="w-full py-16 px-4 border-b border-border/40 bg-card/30">
      <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl bg-card/60 border border-border/60 shadow-xl space-y-6 text-center">
        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono text-crimson uppercase tracking-widest font-bold block">
            FREE CLASSIFIED READER FILE
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black uppercase tracking-tight text-foreground">
            THE SHADOW FILE
          </h2>
          <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans pt-1">
            Receive a story that isn&apos;t available in the public archive. Join the Nobi Kumar
            Reader&apos;s Club and receive an exclusive psychological-thriller case file, early
            previews, and selected archive material.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-crimson hover:bg-crimson/90 text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg hover:scale-105"
          >
            <span>GET THE SHADOW FILE</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
