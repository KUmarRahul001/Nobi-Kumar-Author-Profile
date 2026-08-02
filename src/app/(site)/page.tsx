import * as React from 'react';
import Link from 'next/link';
import { getBooks, getPosts } from '@/lib/db';
import HeroSection from '@/components/organisms/HeroSection';

import AdsterraBanner from '@/components/atoms/AdsterraBanner';

export const revalidate = 3600;

export default async function Home() {
  return (
    <div className="min-h-screen w-full bg-black overflow-hidden flex flex-col justify-between">
      {/* Full Screen Split Hero Entrance Portal */}
      <HeroSection />

      {/* Adsterra Display Banner (Homepage Featured Placement) */}
      <div className="bg-neutral-950 py-4 px-4 border-t border-neutral-800">
        <AdsterraBanner adKey="homepage-banner" format="banner" />
      </div>
    </div>
  );
}
