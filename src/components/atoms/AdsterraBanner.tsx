'use client';

import * as React from 'react';

interface AdsterraBannerProps {
  adKey?: string;
  format?: 'native' | 'banner' | 'banner160x300';
  className?: string;
}

export default function AdsterraBanner({ format = 'native', className = '' }: AdsterraBannerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    // Clear any previous script renders
    containerRef.current.innerHTML = '';

    if (format === 'native') {
      // 1. Native Banner Adsterra Script
      const containerDiv = document.createElement('div');
      containerDiv.id = 'container-358ecbed37a64cbef9220071894c0d82';

      const script = document.createElement('script');
      script.async = true;
      script.dataset.cfasync = 'false';
      script.src =
        'https://pl30653724.effectivecpmnetwork.com/358ecbed37a64cbef9220071894c0d82/invoke.js';

      containerRef.current.appendChild(containerDiv);
      containerRef.current.appendChild(script);
    } else {
      // 2. Banner 160x300 Adsterra Script
      const confScript = document.createElement('script');
      confScript.type = 'text/javascript';
      confScript.innerHTML = `
        atOptions = {
          'key' : '3a170efb3ffd1c3fafe1cc6030be2605',
          'format' : 'iframe',
          'height' : 300,
          'width' : 160,
          'params' : {}
        };
      `;

      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src =
        '//www.highperformanceformat.com/3a170efb3ffd1c3fafe1cc6030be2605/invoke.js';

      containerRef.current.appendChild(confScript);
      containerRef.current.appendChild(invokeScript);
    }
  }, [format]);

  return (
    <div
      className={`w-full max-w-4xl mx-auto my-6 p-4 rounded-xl border border-neutral-800 bg-card/20 flex flex-col items-center justify-center min-h-[100px] text-center overflow-hidden ${className}`}
      aria-label="Sponsored Content"
    >
      <span className="text-[9px] font-mono text-muted/60 uppercase tracking-widest mb-2 block">
        Sponsored / Recommended Reading
      </span>
      <div ref={containerRef} className="w-full flex justify-center items-center overflow-hidden" />
    </div>
  );
}
