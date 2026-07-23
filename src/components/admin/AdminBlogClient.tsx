'use client';

import * as React from 'react';
import { useState } from 'react';

interface Post {
  slug: string;
  title: string;
  category: string;
  status: string;
  publishedAt: string | null;
  coverUrl: string | null;
}

export default function AdminBlogClient({ posts: initialPosts }: { posts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(slug: string) {
    if (!confirm(`Delete blog post "${slug}"? This action cannot be undone.`)) return;
    setDeleting(slug);

    try {
      const res = await fetch(`/api/manage-posts?slug=${slug}`, {
        method: 'DELETE',
        headers: {
          'x-admin-passcode': process.env.NEXT_PUBLIC_ADMIN_PASSCODE || 'Rkraj@8789',
        },
      });

      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.slug !== slug));
      } else {
        alert('Failed to delete post.');
      }
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search blog posts by title or category..."
        className="w-full max-w-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-600/50"
      />

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="px-5 py-3 text-xs font-mono text-white/30 uppercase tracking-wider">
                Cover
              </th>
              <th className="px-5 py-3 text-xs font-mono text-white/30 uppercase tracking-wider">
                Title
              </th>
              <th className="px-5 py-3 text-xs font-mono text-white/30 uppercase tracking-wider">
                Category
              </th>
              <th className="px-5 py-3 text-xs font-mono text-white/30 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-xs font-mono text-white/30 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-white/30 font-mono text-sm">
                  No blog posts found. Click "+ Write New Post" to create one.
                </td>
              </tr>
            ) : (
              filtered.map((post) => (
                <tr
                  key={post.slug}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-5 py-3">
                    {post.coverUrl ? (
                      <img
                        src={post.coverUrl}
                        alt={post.title}
                        className="w-12 h-8 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-12 h-8 bg-white/10 rounded-md flex items-center justify-center text-white/20 text-xs">
                        ✍️
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="font-semibold text-white">{post.title}</div>
                    <div className="text-xs text-white/30 font-mono mt-0.5">{post.slug}</div>
                  </td>
                  <td className="px-5 py-3 text-white/60 text-xs">{post.category}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                        post.status === 'published'
                          ? 'bg-green-900/40 text-green-400 border border-green-700/40'
                          : 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/40'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={`/admin/blog/${post.slug}/edit`}
                        className="px-3 py-1.5 text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white rounded-lg transition-all"
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        disabled={deleting === post.slug}
                        className="px-3 py-1.5 text-xs font-mono bg-red-900/20 hover:bg-red-900/40 border border-red-800/30 text-red-400 rounded-lg transition-all disabled:opacity-50"
                      >
                        {deleting === post.slug ? '…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
