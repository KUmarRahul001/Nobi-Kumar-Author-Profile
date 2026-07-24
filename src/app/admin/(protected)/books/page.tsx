/**
 * src/app/admin/books/page.tsx
 * Admin Books Management — list, add, edit, delete books
 */
import * as React from 'react';
import { createClient } from '@/lib/supabase/server';
import AdminBooksClient from '@/components/admin/AdminBooksClient';

export default async function AdminBooksPage() {
  let books: any[] = [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('Book')
      .select('*')
      .order('displayOrder', { ascending: true });
    if (error) {
      console.error('[Supabase Error - Admin Books]', error);
    }
    if (data) books = data;
  } catch (err) {
    console.error('Failed to fetch books from database:', err);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">Books</h1>
          <p className="text-xs sm:text-sm text-white/40 mt-1 font-mono">
            {books.length} published works
          </p>
        </div>
        <a
          href="/admin/books/new"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white text-xs sm:text-sm font-mono font-bold rounded-xl transition-all shadow shadow-red-900/30 w-full sm:w-auto"
        >
          + Add Book
        </a>
      </div>
      <AdminBooksClient books={books} />
    </div>
  );
}
