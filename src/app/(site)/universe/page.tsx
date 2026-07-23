import * as React from 'react';
import { getUniverseData } from '@/lib/db';
import UniverseMap from '@/components/organisms/UniverseMap';

export const revalidate = 3600;

export default async function UniversePage() {
  const data = await getUniverseData();

  return (
    <div className="flex-1 bg-background text-foreground transition-colors duration-300 py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-mono text-crimson uppercase tracking-widest">
            NNU Universe Hub
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">
            Verma Saga Map
          </h1>
          <p className="text-sm text-muted font-sans leading-relaxed">
            Trace the paths, locations, and psychological intersections binding the characters of
            the Nobi Narrative Universe.
          </p>
        </header>

        <div className="h-px w-24 bg-border mx-auto" />

        {/* Dynamic Map Component */}
        <UniverseMap
          nodes={data.nodes}
          edges={data.edges}
          timeline={(data as any).timeline || []}
        />
      </div>
    </div>
  );
}
