/**
 * src/app/admin/books/page.tsx
 * Admin Books Management — list, add, edit, delete books
 */
import * as React from 'react';
import { prisma } from '@/lib/prisma';
import AdminBooksClient from '@/components/admin/AdminBooksClient';

export default async function AdminBooksPage() {
  let books: any[] = [];
  try {
    books = await prisma.book.findMany({ orderBy: { displayOrder: 'asc' } });
  } catch {}

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-black text-white">Books</h1>
          <p className="text-sm text-white/40 mt-1 font-mono">{books.length} published works</p>
        </div>
        <a
          href="/admin/books/new"
          className="px-5 py-2.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white text-sm font-semibold rounded-xl transition-all shadow shadow-red-900/30"
        >
          + Add Book
        </a>
      </div>
      <AdminBooksClient books={books} />
    </div>
  );
}
