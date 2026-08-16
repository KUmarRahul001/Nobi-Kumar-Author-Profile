'use client';

import * as React from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('[Global Error]', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ background: '#08090b', color: '#fafafa', margin: 0, fontFamily: 'serif' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div style={{ maxWidth: 480, textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                padding: '1.25rem',
                borderRadius: '1rem',
                background: 'rgba(178,31,45,0.1)',
                border: '1px solid rgba(178,31,45,0.3)',
                color: '#b21f2d',
                marginBottom: '1.5rem',
              }}
            >
              <AlertTriangle style={{ width: 40, height: 40 }} />
            </div>
            <p
              style={{
                fontSize: 10,
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#b21f2d',
                fontWeight: 700,
                marginBottom: '0.5rem',
              }}
            >
              NNU ARCHIVE — SYSTEM ERROR
            </p>
            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                marginBottom: '0.75rem',
              }}
            >
              Archive Temporarily Offline
            </h1>
            <p
              style={{
                fontSize: '0.8125rem',
                color: '#a1a1aa',
                lineHeight: 1.7,
                marginBottom: '2rem',
              }}
            >
              An unexpected error occurred while loading this page. The Nobi Narrative Universe
              archive will be back momentarily.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={reset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  background: '#b21f2d',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Try Again
              </button>
              <a
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  background: 'transparent',
                  color: '#fafafa',
                  border: '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                }}
              >
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
