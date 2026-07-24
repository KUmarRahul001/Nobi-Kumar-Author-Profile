'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Book {
  slug: string;
  title: string;
  genre: string;
  status: string;
  isFeatured: boolean;
  coverUrl: string | null;
  releaseDate: string;
}

export default function AdminBooksClient({ books: initialBooks }: { books: Book[] }) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.genre.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/manage-books?slug=${slug}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBooks((prev) => prev.filter((b) => b.slug !== slug));
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(errData.error || `Failed to delete book (Status: ${res.status}).`);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete book.');
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search books by title or genre…"
        className="w-full sm:max-w-xs bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-red-600/50 transition-all"
      />

      {/* Mobile Card List (<640px) */}
      <div className="block sm:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-white/30 font-mono text-xs bg-white/5 rounded-2xl border border-white/10">
            No books found.
          </div>
        ) : (
          filtered.map((book) => (
            <div
              key={book.slug}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3"
            >
              <div className="flex items-start gap-3">
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-16 bg-white/10 rounded-lg flex items-center justify-center text-white/30 text-sm flex-shrink-0">
                    📚
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-white truncate">{book.title}</h3>
                  <p className="text-[11px] text-white/40 font-mono truncate">{book.genre}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider ${
                        book.status === 'published'
                          ? 'bg-green-900/40 text-green-400 border border-green-700/40'
                          : book.status === 'coming-soon'
                            ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/40'
                            : 'bg-white/10 text-white/40 border border-white/10'
                      }`}
                    >
                      {book.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <a
                  href={`/admin/books/${book.slug}/edit`}
                  className="flex-1 text-center py-2 text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white rounded-xl transition-all"
                >
                  Edit Book
                </a>
                <button
                  onClick={() => handleDelete(book.slug)}
                  disabled={deleting === book.slug}
                  className="px-4 py-2 text-xs font-mono bg-red-900/20 hover:bg-red-900/40 border border-red-800/30 text-red-400 rounded-xl transition-all disabled:opacity-50"
                >
                  {deleting === book.slug ? '…' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tablet & Desktop Table (>=640px) */}
      <div className="hidden sm:block bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
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
                  Genre
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
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-white/30 font-mono text-sm"
                  >
                    No books found.
                  </td>
                </tr>
              ) : (
                filtered.map((book) => (
                  <tr
                    key={book.slug}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-5 py-3">
                      {book.coverUrl ? (
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="w-10 h-14 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-10 h-14 bg-white/10 rounded-md flex items-center justify-center text-white/20 text-xs">
                          📚
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-semibold text-white">{book.title}</div>
                      <div className="text-xs text-white/30 font-mono mt-0.5">{book.slug}</div>
                    </td>
                    <td className="px-5 py-3 text-white/60 text-xs">{book.genre}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                          book.status === 'published'
                            ? 'bg-green-900/40 text-green-400 border border-green-700/40'
                            : book.status === 'coming-soon'
                              ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/40'
                              : 'bg-white/10 text-white/40 border border-white/10'
                        }`}
                      >
                        {book.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <a
                          href={`/admin/books/${book.slug}/edit`}
                          className="px-3 py-1.5 text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white rounded-lg transition-all"
                        >
                          Edit
                        </a>
                        <button
                          onClick={() => handleDelete(book.slug)}
                          disabled={deleting === book.slug}
                          className="px-3 py-1.5 text-xs font-mono bg-red-900/20 hover:bg-red-900/40 border border-red-800/30 text-red-400 rounded-lg transition-all disabled:opacity-50"
                        >
                          {deleting === book.slug ? '…' : 'Delete'}
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
    </div>
  );
}
