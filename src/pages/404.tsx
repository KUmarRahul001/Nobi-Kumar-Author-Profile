import React from 'react';

export default function Custom404() {
  return (
    <div
      style={{
        padding: '50px',
        textAlign: 'center',
        backgroundColor: '#0a0a0f',
        color: '#fff',
        minHeight: '100vh',
        fontFamily: 'serif',
      }}
    >
      <h1 style={{ fontSize: '48px', color: '#dc2626' }}>404 - Page Not Found</h1>
      <p style={{ color: '#a3a3a3' }}>
        The story chapter or page you are searching for does not exist.
      </p>
      <a
        href="/"
        style={{
          color: '#ef4444',
          textDecoration: 'underline',
          marginTop: '20px',
          display: 'inline-block',
        }}
      >
        Return Home
      </a>
    </div>
  );
}
