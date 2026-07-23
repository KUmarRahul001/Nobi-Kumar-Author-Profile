'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const slugParam = params?.slug as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Chronicles',
    tags: '',
    excerpt: '',
    content: '',
    status: 'published',
    coverUrl: '',
    seoTitle: '',
    seoDescription: '',
    readingTime: '5 min read',
  });

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/manage-posts?slug=${slugParam}`);
        if (!res.ok) throw new Error('Post not found');
        const post = await res.json();

        setFormData({
          title: post.title || '',
          slug: post.slug || '',
          category: post.category || 'Chronicles',
          tags: post.tags || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          status: post.status || 'published',
          coverUrl: post.coverUrl || '',
          seoTitle: post.seoTitle || '',
          seoDescription: post.seoDescription || '',
          readingTime: post.readingTime || '5 min read',
        });
      } catch (err: any) {
        setError(err.message || 'Failed to load post');
      } finally {
        setFetching(false);
      }
    }
    if (slugParam) fetchPost();
  }, [slugParam]);

  async function handleFileUpload(file: File) {
    setUploading(true);
    setError('');
    const form = new FormData();
    form.append('file', file);
    form.append('type', 'blog-cover');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setFormData((prev) => ({ ...prev, coverUrl: data.url }));
    } catch (err: any) {
      setError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/manage-posts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': process.env.NEXT_PUBLIC_ADMIN_PASSCODE || 'Rkraj@8789',
        },
        body: JSON.stringify({
          ...formData,
          originalSlug: slugParam,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update blog post');

      router.push('/admin/blog');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to update blog post');
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="p-8 text-center text-white/50 font-mono">Loading blog post details...</div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-black">Edit Blog Post</h1>
          <p className="text-sm text-white/40 font-mono mt-1">
            Editing "{formData.title || slugParam}"
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-sm font-mono rounded-xl transition-all"
        >
          ← Cancel
        </button>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-700/50 rounded-xl px-4 py-3 text-xs text-red-300 font-mono">
          ⚠ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest">
            Article Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-white/60 mb-1">Article Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-600/60"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/60 mb-1">Slug (URL ID) *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-red-600/60"
              />
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest">
            Cover Image & Summary
          </h2>
          <div>
            <label className="block text-xs font-mono text-white/60 mb-1">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="block w-full text-xs text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-mono file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
            />
            {formData.coverUrl && (
              <div className="mt-2 flex items-center gap-3">
                <img
                  src={formData.coverUrl}
                  alt="Cover Preview"
                  className="w-20 h-12 object-cover rounded-lg border border-white/10"
                />
                <span className="text-xs font-mono text-green-400">✓ Cover Image Set</span>
              </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-mono text-white/60 mb-1">
              Excerpt / Summary *
            </label>
            <input
              type="text"
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-600/60"
            />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest">
            Article Body Content *
          </h2>
          <textarea
            required
            rows={12}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-mono focus:outline-none focus:border-red-600/60 leading-relaxed"
          />
        </div>

        <button
          type="submit"
          disabled={loading || uploading}
          className="w-full py-3.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-900/30 disabled:opacity-50"
        >
          {loading ? 'Updating Post…' : 'Update Blog Post'}
        </button>
      </form>
    </div>
  );
}
