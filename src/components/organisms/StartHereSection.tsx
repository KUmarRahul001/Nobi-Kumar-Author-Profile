import * as React from 'react';
import Link from 'next/link';

export default function StartHereSection() {
  return (
    <section
      aria-labelledby="start-here-heading"
      className="w-full py-16 px-4 border-b border-border/40 bg-card/20"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-crimson uppercase tracking-widest font-bold block">
            FOR FIRST-TIME READERS
          </span>
          <h2
            id="start-here-heading"
            className="text-3xl sm:text-4xl font-serif font-black uppercase tracking-tight text-foreground"
          >
            START HERE
          </h2>
          <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans">
            Step into the Nobi Narrative Universe through its first shadows, fractured memories, and
            interconnected stories.
          </p>
          <div className="w-16 h-0.5 bg-crimson mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Path 1: READ THE BOOKS */}
          <div className="p-6 md:p-8 rounded-2xl bg-card/60 border border-border/60 shadow-lg flex flex-col justify-between space-y-6 hover:border-crimson/50 transition-all">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-crimson font-bold block">
                PATH 01 / NOVELS
              </span>
              <h3 className="text-xl font-serif font-bold text-foreground">READ THE BOOKS</h3>
              <p className="text-xs text-muted leading-relaxed font-sans">
                Explore published psychological thrillers, dark campus mysteries, and the
                foundational Verma Saga.
              </p>
            </div>
            <div>
              <Link
                href="/books"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-crimson hover:underline uppercase tracking-wider"
              >
                <span>EXPLORE NOVELS</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Path 2: ENTER THE UNIVERSE */}
          <div className="p-6 md:p-8 rounded-2xl bg-card/60 border border-border/60 shadow-lg flex flex-col justify-between space-y-6 hover:border-crimson/50 transition-all">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-crimson font-bold block">
                PATH 02 / ARCHIVE MAP
              </span>
              <h3 className="text-xl font-serif font-bold text-foreground">ENTER THE UNIVERSE</h3>
              <p className="text-xs text-muted leading-relaxed font-sans">
                Navigate the interactive NNU map connecting characters, locations, timelines, and
                hidden evidence.
              </p>
            </div>
            <div>
              <Link
                href="/universe"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-crimson hover:underline uppercase tracking-wider"
              >
                <span>OPEN UNIVERSE MAP</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Path 3: READ THE CHRONICLES */}
          <div className="p-6 md:p-8 rounded-2xl bg-card/60 border border-border/60 shadow-lg flex flex-col justify-between space-y-6 hover:border-crimson/50 transition-all">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-crimson font-bold block">
                PATH 03 / CASE FILES
              </span>
              <h3 className="text-xl font-serif font-bold text-foreground">READ THE CHRONICLES</h3>
              <p className="text-xs text-muted leading-relaxed font-sans">
                Discover author case files, writing insights, psychological analyses, and
                behind-the-scenes notes.
              </p>
            </div>
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-crimson hover:underline uppercase tracking-wider"
              >
                <span>READ CASE FILES</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
