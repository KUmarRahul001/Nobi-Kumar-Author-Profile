import * as React from 'react';
import Link from 'next/link';
import { getBooks, getPosts } from '@/lib/db';
import HeroSection from '@/components/organisms/HeroSection';

export const revalidate = 3600;

export default async function Home() {
  return (
    <div className="min-h-screen w-full bg-black overflow-hidden flex flex-col justify-between">
      {/* Full Screen Split Hero Entrance Portal */}
      <HeroSection />
    </div>
  );
}
