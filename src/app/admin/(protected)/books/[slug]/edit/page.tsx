'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditBookPage() {
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
    subtitle: '',
    seriesName: '',
    volumeNumber: '',
    genre: 'Psychological Thriller',
    tags: '',
    shortDescription: '',
    fullSynopsis: '',
    releaseDate: '',
    isbn: '',
    language: 'English',
    pages: '',
    readingTime: '',
    status: 'published',
    coverUrl: '',
    bannerUrl: '',
    trailerLink: '',
    samplePdfUrl: '',
    previewUrl: '',
    awards: '',
    isFeatured: false,
    isBestseller: false,
    isEditorsChoice: false,
    displayOrder: 1,
    amazonLink: '',
    googlePlayLink: '',
    appleBooksLink: '',
    koboLink: '',
    paperbackLink: '',
    hardcoverLink: '',
    officialWebsiteLink: '',
    pocketFmLink: '',
    kukuFmLink: '',
    audibleLink: '',
    storytelLink: '',
  });

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`/api/manage-books?slug=${slugParam}`);
        if (!res.ok) throw new Error('Book not found');
        const book = await res.json();

        setFormData({
          title: book.title || '',
          slug: book.slug || '',
          subtitle: book.subtitle || '',
          seriesName: book.seriesName || '',
          volumeNumber: book.volumeNumber ? String(book.volumeNumber) : '',
          genre: book.genre || 'Psychological Thriller',
          tags: book.tags || '',
          shortDescription: book.shortDescription || '',
          fullSynopsis: book.fullSynopsis || '',
          releaseDate: book.releaseDate || '',
          isbn: book.isbn || '',
          language: book.language || 'English',
          pages: book.pages ? String(book.pages) : '',
          readingTime: book.readingTime || '',
          status: book.status || 'published',
          coverUrl: book.coverUrl || '',
          bannerUrl: book.bannerUrl || '',
          trailerLink: book.trailerLink || '',
          samplePdfUrl: book.samplePdfUrl || '',
          previewUrl: book.previewUrl || '',
          awards: book.awards || '',
          isFeatured: Boolean(book.isFeatured),
          isBestseller: Boolean(book.isBestseller),
          isEditorsChoice: Boolean(book.isEditorsChoice),
          displayOrder: book.displayOrder || 1,
          amazonLink: book.amazonLink || '',
          googlePlayLink: book.googlePlayLink || '',
          appleBooksLink: book.appleBooksLink || '',
          koboLink: book.koboLink || '',
          paperbackLink: book.paperbackLink || '',
          hardcoverLink: book.hardcoverLink || '',
          officialWebsiteLink: book.officialWebsiteLink || '',
          pocketFmLink: book.pocketFmLink || '',
          kukuFmLink: book.kukuFmLink || '',
          audibleLink: book.audibleLink || '',
          storytelLink: book.storytelLink || '',
        });
      } catch (err: any) {
        setError(err.message || 'Failed to load book');
      } finally {
        setFetching(false);
      }
    }
    if (slugParam) fetchBook();
  }, [slugParam]);

  async function handleFileUpload(file: File, field: 'coverUrl' | 'bannerUrl' | 'samplePdfUrl') {
    setUploading(true);
    setError('');
    const form = new FormData();
    form.append('file', file);
    form.append(
      'type',
      field === 'coverUrl' ? 'cover' : field === 'bannerUrl' ? 'banner' : 'sample'
    );

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setFormData((prev) => ({ ...prev, [field]: data.url }));
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
      const payload = {
        ...formData,
        originalSlug: slugParam,
        volumeNumber: formData.volumeNumber ? parseInt(formData.volumeNumber) : null,
        pages: formData.pages ? parseInt(formData.pages) : null,
        displayOrder: parseInt(String(formData.displayOrder)),
      };

      const res = await fetch('/api/manage-books', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': process.env.NEXT_PUBLIC_ADMIN_PASSCODE || 'Rkraj@8789',
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(`Server returned unexpected response (${res.status})`);
      }

      if (!res.ok) throw new Error(data.error || 'Failed to update book');

      router.push('/admin/books');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to update book');
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return <div className="p-8 text-center text-white/50 font-mono">Loading book details...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-black">Edit Book</h1>
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
        {/* Core Info */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest">
            Core Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-white/60 mb-1">Title *</label>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-white/60 mb-1">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-600/60"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/60 mb-1">Genre *</label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full bg-[#12121a] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-600/60"
              >
                <option value="Psychological Thriller">Psychological Thriller</option>
                <option value="Crime Noir">Crime Noir</option>
                <option value="Horror">Horror</option>
                <option value="Mystery">Mystery</option>
                <option value="Sci-Fi">Sci-Fi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest">
            Media & Covers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-white/60 mb-1">Book Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] && handleFileUpload(e.target.files[0], 'coverUrl')
                }
                className="block w-full text-xs text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-mono file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
              />
              {formData.coverUrl && (
                <div className="mt-2 flex items-center gap-3">
                  <img
                    src={formData.coverUrl}
                    alt="Cover Preview"
                    className="w-12 h-16 object-cover rounded-lg border border-white/10"
                  />
                  <span className="text-xs font-mono text-green-400">✓ Cover set</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-white/60 mb-1">Banner Image URL</label>
              <input
                type="text"
                value={formData.bannerUrl}
                onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-600/60"
              />
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest">Synopses</h2>
          <div>
            <label className="block text-xs font-mono text-white/60 mb-1">
              Short Description *
            </label>
            <input
              type="text"
              required
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-600/60"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-white/60 mb-1">Full Synopsis *</label>
            <textarea
              required
              rows={5}
              value={formData.fullSynopsis}
              onChange={(e) => setFormData({ ...formData, fullSynopsis: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-600/60"
            />
          </div>
        </div>

        {/* Audiobooks & Audio Drama Platforms */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎧</span>
            <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest">
              Audiobook & Audio Drama Platforms
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-red-400/80 mb-1">
                📻 Pocket FM Link
              </label>
              <input
                type="url"
                value={formData.pocketFmLink}
                onChange={(e) => setFormData({ ...formData, pocketFmLink: e.target.value })}
                placeholder="https://pocketfm.com/show/..."
                className="w-full bg-white/5 border border-red-900/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500/60"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-orange-400/80 mb-1">
                🎙️ Kuku FM Link
              </label>
              <input
                type="url"
                value={formData.kukuFmLink}
                onChange={(e) => setFormData({ ...formData, kukuFmLink: e.target.value })}
                placeholder="https://kukufm.com/show/..."
                className="w-full bg-white/5 border border-orange-900/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/60"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-yellow-400/80 mb-1">
                🔊 Audible Link
              </label>
              <input
                type="url"
                value={formData.audibleLink}
                onChange={(e) => setFormData({ ...formData, audibleLink: e.target.value })}
                placeholder="https://audible.com/pd/..."
                className="w-full bg-white/5 border border-yellow-900/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-500/60"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-pink-400/80 mb-1">
                📖 Storytel Link
              </label>
              <input
                type="url"
                value={formData.storytelLink}
                onChange={(e) => setFormData({ ...formData, storytelLink: e.target.value })}
                placeholder="https://storytel.com/books/..."
                className="w-full bg-white/5 border border-pink-900/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500/60"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || uploading}
          className="w-full py-3.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-900/30 disabled:opacity-50"
        >
          {loading ? 'Updating Book…' : 'Update Book in Catalog'}
        </button>
      </form>
    </div>
  );
}
