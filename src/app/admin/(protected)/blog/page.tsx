/**
 * src/app/admin/(protected)/blog/page.tsx
 * Admin Blog Posts Management Page
 */
import * as React from 'react';
import { createClient } from '@/lib/supabase/server';
import AdminBlogClient from '@/components/admin/AdminBlogClient';

export default async function AdminBlogPage() {
  let posts: any[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('Post')
      .select('*')
      .order('createdAt', { ascending: false });
    if (data) posts = data;
  } catch {}

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-black text-white">Blog Posts</h1>
          <p className="text-sm text-white/40 mt-1 font-mono">
            {posts.length} published articles & chronicles
          </p>
        </div>
        <a
          href="/admin/blog/new"
          className="px-5 py-2.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white text-sm font-semibold rounded-xl transition-all shadow shadow-red-900/30"
        >
          + Write New Post
        </a>
      </div>

      <AdminBlogClient posts={posts} />
    </div>
  );
}
