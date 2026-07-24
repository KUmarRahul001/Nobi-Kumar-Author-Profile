'use client';

import * as React from 'react';

export default function KofiWidget() {
  React.useEffect(() => {
    // Lazy-load official Ko-fi widget script for zero layout shift & max performance
    const script = document.createElement('script');
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    script.async = true;

    script.onload = () => {
      if ((window as any).kofiWidgetOverlay) {
        (window as any).kofiWidgetOverlay.draw('nobikumar', {
          type: 'floating-chat',
          'floating-chat.donateButton.text': 'Support Me',
          'floating-chat.donateButton.background-color': '#e11d48',
          'floating-chat.donateButton.text-color': '#fff',
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Clean up on unmount if needed
      try {
        const kofiOverlay = document.getElementById('kofi-widget-overlay');
        if (kofiOverlay) kofiOverlay.remove();
      } catch {}
    };
  }, []);

  return null;
}
