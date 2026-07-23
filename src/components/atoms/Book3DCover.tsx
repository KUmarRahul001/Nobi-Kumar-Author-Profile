'use client';

import React from 'react';

interface Book3DCoverProps {
  coverUrl: string;
  title: string;
  className?: string;
}

export default function Book3DCover({ coverUrl, title, className = '' }: Book3DCoverProps) {
  return (
    <div className={`group relative inline-block cursor-pointer select-none ${className}`}>
      {/* 3D Container with Perspective */}
      <div
        className="relative w-full aspect-[2/3] transition-all duration-500 ease-out transform-gpu group-hover:[transform:rotateY(-25deg)_rotateX(5deg)_scale(1.05)] shadow-xl group-hover:shadow-[25px_25px_30px_rgba(0,0,0,0.5)] rounded-r-sm"
        style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
      >
        {/* Front Cover Face */}
        <div className="absolute inset-0 overflow-hidden rounded-r-sm bg-neutral-900 border border-white/10 z-20">
          <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
          {/* Subtle glossy sheen highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/15 pointer-events-none" />
        </div>

        {/* 3D Pages Thickness Effect (Right Edge - Shows on Hover) */}
        <div
          className="absolute top-0 bottom-0 right-0 w-6 origin-left bg-neutral-100 border-y border-r border-neutral-300 shadow-inner z-10 transition-opacity duration-300 opacity-90"
          style={{
            transform: 'rotateY(90deg) translateZ(0px)',
            backgroundImage:
              'repeating-linear-gradient(90deg, #e0e0e0, #e0e0e0 1.5px, #ffffff 1.5px, #ffffff 3px)',
          }}
        />

        {/* Spine Shadow Crease Effect (Left Fold Line) */}
        <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/40 to-transparent z-30 pointer-events-none" />
      </div>
    </div>
  );
}
