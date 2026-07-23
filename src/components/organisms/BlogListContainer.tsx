'use client';

import * as React from 'react';
import { Post } from '@/lib/db';
import BlogCard from '@/components/molecules/BlogCard';

interface BlogListContainerProps {
  initialPosts: Post[];
}

export default function BlogListContainer({ initialPosts }: BlogListContainerProps) {
  const [activeCategory, setActiveCategory] = React.useState<string>('all');

  // Extract unique categories dynamically
  const categories = React.useMemo(() => {
    const cats = new Set(initialPosts.map((post) => post.category));
    return ['all', ...Array.from(cats)];
  }, [initialPosts]);

  const filteredPosts = React.useMemo(() => {
    if (activeCategory === 'all') return initialPosts;
    return initialPosts.filter((post) => post.category === activeCategory);
  }, [initialPosts, activeCategory]);

  return (
    <div className="space-y-8">
      {/* Category Filter Badges (Task 14.4) */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2 focus:ring-offset-background ${
              activeCategory === cat
                ? 'bg-crimson text-white border border-transparent'
                : 'border border-border text-muted hover:text-foreground hover:bg-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted font-mono text-xs border border-dashed border-border rounded-lg">
          No archives updates found matching this category.
        </div>
      )}
    </div>
  );
}
