import * as React from 'react';
import { getPosts } from '@/lib/db';
import BlogListContainer from '@/components/organisms/BlogListContainer';

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="flex-1 bg-background text-foreground transition-colors duration-300 py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-mono text-crimson uppercase tracking-widest">
            Archives
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">
            Latest Chronicles
          </h1>
          <p className="text-sm text-muted font-sans leading-relaxed">
            Read updates, behind-the-scenes timelines, and annotations about the Nobi Narrative
            Universe.
          </p>
        </header>

        <div className="h-px w-24 bg-border mx-auto" />

        {/* Dynamic Client List Container with Filters */}
        <BlogListContainer initialPosts={posts} />
      </div>
    </div>
  );
}
