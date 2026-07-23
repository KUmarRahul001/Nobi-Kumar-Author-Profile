'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@/lib/book-validation';
import { bookFormSchema, BookFormValues } from '@/schemas/book.schema';
import { GENRES } from '@/constants/genres';
import { LANGUAGES } from '@/constants/languages';
import { SERIES } from '@/constants/series';
import { Save, Plus, Trash2, Image as ImageIcon, Eye, Edit3 } from 'lucide-react';
import { Book } from '@/types/book';

interface BookFormProps {
  initialBook?: Book;
  onSubmit: (values: BookFormValues) => void;
  onCancel: () => void;
}

export default function BookForm({ initialBook, onSubmit, onCancel }: BookFormProps) {
  const [activeTab, setActiveTab] = React.useState<'edit' | 'preview'>('edit');
  const [coverUploading, setCoverUploading] = React.useState(false);
  const [bannerUploading, setBannerUploading] = React.useState(false);

  const defaultValues: Partial<BookFormValues> = React.useMemo(() => {
    if (initialBook) {
      return {
        ...initialBook,
        volumeNumber: initialBook.volumeNumber || undefined,
        pages: initialBook.pages || undefined,
        buyLinks: {
          amazon: initialBook.buyLinks.amazon || '',
          googlePlay: initialBook.buyLinks.googlePlay || '',
          appleBooks: initialBook.buyLinks.appleBooks || '',
          kobo: initialBook.buyLinks.kobo || '',
          paperback: initialBook.buyLinks.paperback || '',
          hardcover: initialBook.buyLinks.hardcover || '',
          officialWebsite: initialBook.buyLinks.officialWebsite || '',
          custom: initialBook.buyLinks.custom || '',
        },
      };
    }
    return {
      title: '',
      subtitle: '',
      seriesName: 'Standalone Novel',
      volumeNumber: undefined,
      genre: 'Psychological Thriller',
      tags: ['NNU'],
      shortDescription: '',
      fullSynopsis: '',
      releaseDate: new Date().toISOString().split('T')[0],
      isbn: '',
      language: 'English',
      pages: undefined,
      readingTime: '',
      status: 'draft',
      coverUrl: '',
      bannerUrl: '',
      trailerLink: '',
      buyLinks: {
        amazon: '',
        googlePlay: '',
        appleBooks: '',
        kobo: '',
        paperback: '',
        hardcover: '',
        officialWebsite: '',
        custom: '',
      },
      samplePdfUrl: '',
      previewUrl: '',
      awards: [],
      isFeatured: false,
      isBestseller: false,
      isEditorsChoice: false,
      displayOrder: 0,
      seoTitle: '',
      seoDescription: '',
      socialShareImage: '',
      authorNotes: '',
      ageRating: '',
      contentWarning: '',
    };
  }, [initialBook]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues,
  });

  const formValues = watch();

  // Handle files image upload
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'coverUrl' | 'bannerUrl'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (field === 'coverUrl') setCoverUploading(true);
    if (field === 'bannerUrl') setBannerUploading(true);

    try {
      const data = new FormData();
      data.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const res = await response.json();
      if (!response.ok) throw new Error(res.error || 'Failed to upload image');

      setValue(field, res.url);
    } catch {
      alert('Upload failed. Using entered URL instead.');
    } finally {
      setCoverUploading(false);
      setBannerUploading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-card border border-border/80 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 space-y-6">
      {/* Header and Toggle Edit/Preview Tabs */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/30 pb-4">
        <div>
          <h2 className="text-xl font-serif font-black tracking-tight text-foreground">
            {initialBook ? `Edit: ${initialBook.title}` : 'Scaffold New Novel Record'}
          </h2>
          <p className="text-xs text-muted font-mono uppercase tracking-widest mt-0.5">
            Fill the metadata constraints fields below
          </p>
        </div>

        <div className="flex gap-2 bg-neutral-900 p-1 rounded border border-border">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`px-3 py-1.5 rounded text-[10px] font-mono uppercase font-bold tracking-widest transition-colors flex items-center gap-1.5 ${
              activeTab === 'edit' ? 'bg-crimson text-white' : 'text-muted hover:text-foreground'
            }`}
          >
            <Edit3 size={12} /> Edit Form
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded text-[10px] font-mono uppercase font-bold tracking-widest transition-colors flex items-center gap-1.5 ${
              activeTab === 'preview' ? 'bg-crimson text-white' : 'text-muted hover:text-foreground'
            }`}
          >
            <Eye size={12} /> Live Preview
          </button>
        </div>
      </header>

      {activeTab === 'edit' ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* General section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-mono text-muted">Book Title *</label>
              <input
                type="text"
                {...register('title')}
                className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
              />
              {errors.title && (
                <p className="text-[10px] text-crimson font-mono">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono text-muted">Subtitle</label>
              <input
                type="text"
                {...register('subtitle')}
                className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-mono text-muted">Series Association</label>
              <select
                {...register('seriesName')}
                className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-muted focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
              >
                {SERIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono text-muted">Volume Number</label>
              <input
                type="number"
                {...register('volumeNumber', { valueAsNumber: true })}
                className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono text-muted">Genre *</label>
              <select
                {...register('genre')}
                className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-muted focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
              >
                {GENRES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cover & Banner uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-mono text-muted">Cover Image URL / Upload</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  {...register('coverUrl')}
                  placeholder="/images/books/cover.jpg"
                  className="flex-1 bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
                />
                <label className="cursor-pointer bg-neutral-900 hover:bg-neutral-800 border border-border rounded p-2 flex items-center justify-center shrink-0">
                  <ImageIcon size={16} className="text-muted" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'coverUrl')}
                    className="hidden"
                  />
                </label>
              </div>
              {coverUploading && (
                <p className="text-[10px] text-amber-500 font-mono">Uploading cover artwork...</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-muted">
                Banner Image URL / Upload
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  {...register('bannerUrl')}
                  placeholder="/images/books/banner.jpg"
                  className="flex-1 bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
                />
                <label className="cursor-pointer bg-neutral-900 hover:bg-neutral-800 border border-border rounded p-2 flex items-center justify-center shrink-0">
                  <ImageIcon size={16} className="text-muted" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'bannerUrl')}
                    className="hidden"
                  />
                </label>
              </div>
              {bannerUploading && (
                <p className="text-[10px] text-amber-500 font-mono">Uploading banner artwork...</p>
              )}
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-1">
            <label className="block text-xs font-mono text-muted">Short Description *</label>
            <textarea
              rows={2}
              {...register('shortDescription')}
              className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
            />
            {errors.shortDescription && (
              <p className="text-[10px] text-crimson font-mono">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono text-muted">Full Synopsis *</label>
            <textarea
              rows={5}
              {...register('fullSynopsis')}
              className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
            />
            {errors.fullSynopsis && (
              <p className="text-[10px] text-crimson font-mono">{errors.fullSynopsis.message}</p>
            )}
          </div>

          {/* Buy Links group */}
          <div className="space-y-3 p-4 rounded-xl border border-border/40 bg-neutral-950/20">
            <h3 className="text-xs font-mono uppercase tracking-widest text-crimson font-bold">
              Purchase Retailer Outlets Mappings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-muted">Amazon URL</label>
                <input
                  type="text"
                  {...register('buyLinks.amazon')}
                  className="w-full bg-neutral-900 border border-border rounded p-2 text-xs text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-muted">Google Play URL</label>
                <input
                  type="text"
                  {...register('buyLinks.googlePlay')}
                  className="w-full bg-neutral-900 border border-border rounded p-2 text-xs text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-muted">Apple Books URL</label>
                <input
                  type="text"
                  {...register('buyLinks.appleBooks')}
                  className="w-full bg-neutral-900 border border-border rounded p-2 text-xs text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-muted">Kobo URL</label>
                <input
                  type="text"
                  {...register('buyLinks.kobo')}
                  className="w-full bg-neutral-900 border border-border rounded p-2 text-xs text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
                />
              </div>
            </div>
          </div>

          {/* Status & Options checkboxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-mono text-muted">Status</label>
              <select
                {...register('status')}
                className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-muted focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
              >
                <option value="published">Published</option>
                <option value="coming-soon">Coming Soon</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono text-muted">Language</label>
              <select
                {...register('language')}
                className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-muted focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono text-muted">Display Order</label>
              <input
                type="number"
                {...register('displayOrder', { valueAsNumber: true })}
                className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
              />
            </div>

            <div className="flex flex-col justify-center space-y-1 pt-4">
              <label className="flex items-center gap-2 text-xs font-mono text-muted cursor-pointer">
                <input
                  type="checkbox"
                  {...register('isFeatured')}
                  className="accent-crimson rounded"
                />
                Featured Book
              </label>
              <label className="flex items-center gap-2 text-xs font-mono text-muted cursor-pointer">
                <input
                  type="checkbox"
                  {...register('isBestseller')}
                  className="accent-crimson rounded"
                />
                Bestseller
              </label>
              <label className="flex items-center gap-2 text-xs font-mono text-muted cursor-pointer">
                <input
                  type="checkbox"
                  {...register('isEditorsChoice')}
                  className="accent-crimson rounded"
                />
                Editor Choice
              </label>
            </div>
          </div>

          {/* Details & Author Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-mono text-muted">Author Notes</label>
              <textarea
                rows={2}
                {...register('authorNotes')}
                className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono text-muted">Content Warning</label>
              <textarea
                rows={2}
                {...register('contentWarning')}
                className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
              />
            </div>
          </div>

          {/* Form Actions Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border/30">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded text-xs font-mono uppercase font-bold tracking-widest text-muted hover:text-foreground border border-border hover:bg-neutral-800 transition-colors focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded text-xs font-mono uppercase font-bold tracking-widest bg-crimson text-white hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-crimson"
            >
              <Save size={14} /> {isSubmitting ? 'Saving...' : 'Save Book'}
            </button>
          </div>
        </form>
      ) : (
        /* Live Preview container */
        <div className="p-6 border border-dashed border-border/80 rounded-xl space-y-4 bg-neutral-950/40">
          <div className="flex gap-4">
            <div className="w-24 aspect-[2/3] bg-neutral-900 relative rounded overflow-hidden shrink-0 border border-border">
              {formValues.coverUrl && (
                <img
                  src={formValues.coverUrl}
                  alt="Cover Preview"
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-mono text-crimson uppercase tracking-widest block">
                {formValues.seriesName || 'Series name'}
              </span>
              <h3 className="text-lg font-serif font-bold text-foreground">
                {formValues.title || 'Untitled Novel'}
              </h3>
              <p className="text-xs text-muted font-sans italic">
                {formValues.subtitle || 'Subtitle preview'}
              </p>
              <p className="text-xs text-muted leading-relaxed font-sans pt-2">
                {formValues.shortDescription || 'Short description preview'}
              </p>
            </div>
          </div>
          <div className="border-t border-border/30 pt-3">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-crimson font-bold mb-1">
              Full Synopsis Preview
            </h4>
            <p className="text-xs text-muted leading-relaxed font-sans whitespace-pre-wrap">
              {formValues.fullSynopsis || 'No full synopsis provided.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
