import * as React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      aria-label="Author Entrance Portal"
      className="w-full min-h-screen relative bg-neutral-950 text-white overflow-hidden flex flex-col justify-between"
    >
      {/* Top Notice Bar */}
      <div className="w-full bg-black text-neutral-400 text-[11px] md:text-xs font-mono py-2.5 px-4 text-center border-b border-neutral-800/80 z-20">
        <span>For official media queries or publishing requests Contact ✉ </span>
        <a
          href="mailto:kumarrahulraj468@gmail.com"
          className="text-white hover:text-red-400 font-bold underline"
        >
          kumarrahulraj468@gmail.com
        </a>
      </div>

      {/* Split Screen Portal (Full Height) */}
      <div className="relative w-full flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
        {/* Left Half: THE NOVELIST / AUTHOR (Dark background with Author Portrait) */}
        <div className="relative min-h-[45vh] md:min-h-full flex flex-col justify-center items-center p-8 md:p-14 overflow-hidden group">
          {/* Author Speaker Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/nobi-author.png"
              alt="Nobi Kumar Author"
              className="w-full h-full object-cover object-top filter brightness-[0.4] group-hover:brightness-[0.5] transition-all duration-700 scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>

          {/* Left Portal Overlay */}
          <div className="relative z-10 text-center space-y-6 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-neutral-400" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-[0.25em] text-white uppercase">
                THE NOVELIST
              </h2>
              <div className="h-px w-12 bg-neutral-400" />
            </div>

            <p className="text-xs md:text-sm font-sans text-neutral-300 max-w-sm mx-auto leading-relaxed">
              Explore psychological thrillers, dark campus mysteries, and the Verma Saga catalog.
            </p>

            <div className="pt-4">
              <Link
                href="/books"
                className="inline-block px-8 py-3.5 bg-white/10 hover:bg-white text-white hover:text-black border border-white/40 text-xs font-mono font-bold uppercase tracking-[0.2em] rounded-none transition-all duration-300 shadow-xl"
              >
                ENTER NOVELS ARCHIVE →
              </Link>
            </div>
          </div>
        </div>

        {/* Right Half: THE WRITER & UNIVERSE (High Contrast Clean White Background) */}
        <div className="relative min-h-[45vh] md:min-h-full flex flex-col justify-center items-center p-8 md:p-14 bg-white text-neutral-900 overflow-hidden group">
          {/* Right Portal Overlay */}
          <div className="relative z-10 text-center space-y-6 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-neutral-400" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-[0.25em] text-neutral-900 uppercase">
                THE WRITER
              </h2>
              <div className="h-px w-12 bg-neutral-400" />
            </div>

            <p className="text-xs md:text-sm font-sans text-neutral-600 max-w-sm mx-auto leading-relaxed">
              Discover the Nobi Narrative Universe (NNU) map, character archives, and author
              chronicles.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Link
                href="/universe"
                className="px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono font-bold uppercase tracking-[0.2em] rounded-none transition-all duration-300 shadow-xl"
              >
                ENTER UNIVERSE MAP →
              </Link>
              <Link
                href="/blog"
                className="px-8 py-3.5 bg-transparent hover:bg-neutral-100 text-neutral-900 border border-neutral-900 text-xs font-mono font-bold uppercase tracking-[0.2em] rounded-none transition-all duration-300"
              >
                READ CHRONICLES
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Center Badge (Identical to chetanbhagat.com center signature block) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block">
        <div className="bg-white px-8 py-5 rounded-md shadow-2xl border border-neutral-200 transform hover:scale-105 transition-transform duration-300">
          <img
            src="/assets/nobi-signature.png"
            alt="Nobi Kumar Signature Logo"
            className="h-16 w-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
