import * as React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      aria-label="Author Archive Entrance"
      className="w-full relative bg-neutral-950 text-white overflow-hidden py-16 md:py-24 border-b border-border/40"
    >
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Editorial Content Area */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-crimson uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
              <span>NOBI KUMAR / AUTHOR DOSSIER 001</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white uppercase">
                NOBI KUMAR
              </h1>
              <p className="text-sm sm:text-base font-mono text-neutral-400 uppercase tracking-widest">
                Psychological Thrillers · Dark Fiction · The Nobi Narrative Universe
              </p>
            </div>

            <blockquote className="border-l-2 border-crimson pl-4 py-1 text-base sm:text-lg font-serif italic text-neutral-300 max-w-xl mx-auto lg:mx-0">
              &ldquo;Every shadow leaves a story behind.&rdquo;
            </blockquote>

            <p className="text-xs sm:text-sm font-sans text-neutral-400 max-w-xl leading-relaxed mx-auto lg:mx-0">
              Welcome to the private archive of Nobi Kumar. Step inside to explore dark campus
              mysteries, psychological suspense, interconnected character files, and the secrets of
              the Verma Saga.
            </p>

            {/* CTA Toolbar */}
            <div className="pt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/books"
                className="px-6 py-3.5 bg-crimson hover:bg-crimson/90 text-white text-xs font-mono font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg hover:scale-105"
              >
                EXPLORE THE BOOKS →
              </Link>
              <Link
                href="/universe"
                className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 text-xs font-mono font-bold uppercase tracking-widest rounded-lg transition-all"
              >
                ENTER THE UNIVERSE
              </Link>
              <Link
                href="/blog"
                className="px-6 py-3.5 bg-transparent hover:bg-neutral-900 text-neutral-300 border border-neutral-800 text-xs font-mono font-bold uppercase tracking-widest rounded-lg transition-all"
              >
                READ THE CHRONICLES
              </Link>
            </div>
          </div>

          {/* Right Editorial Dossier Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-72 sm:w-80 md:w-96 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl group">
              <img
                src="/assets/nobi-author.png"
                alt="Nobi Kumar Author Portrait"
                className="w-full h-auto object-cover filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-neutral-800/80 text-left space-y-1">
                <span className="text-[10px] font-mono text-crimson font-bold uppercase tracking-widest block">
                  ARCHIVAL RECORD
                </span>
                <p className="text-xs font-serif font-bold text-white">
                  Nobi Kumar — Author & Storyteller
                </p>
                <p className="text-[10px] font-mono text-neutral-400">
                  NNU Universe Files · Verma Saga
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
