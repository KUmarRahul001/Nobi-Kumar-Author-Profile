'use client';

import * as React from 'react';

interface AdsterraBannerProps {
  adKey?: string;
  format?: 'banner' | 'native';
  className?: string;
}

export default function AdsterraBanner({
  adKey = 'default-adsterra-banner',
  format = 'banner',
  className = '',
}: AdsterraBannerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Non-intrusive container placeholder logic
    // Adsterra ad scripts can be initialized asynchronously here safely without layout shift
  }, [adKey, format]);

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-4xl mx-auto my-6 p-4 rounded-xl border border-border/40 bg-card/20 flex flex-col items-center justify-center min-h-[90px] text-center transition-all ${className}`}
      aria-label="Advertisement"
    >
      <span className="text-[9px] font-mono text-muted/60 uppercase tracking-widest mb-1">
        Sponsor / Recommended Reading
      </span>
      <div id={`adsterra-container-${adKey}`} className="w-full flex justify-center items-center">
        <p className="text-xs font-mono text-muted italic">
          [ Adsterra Non-Intrusive {format === 'native' ? 'Native Banner' : 'Display Banner'} Ad
          Slot ]
        </p>
      </div>
    </div>
  );
}
