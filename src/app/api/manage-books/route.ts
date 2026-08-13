/**
 * src/app/api/manage-books/route.ts
 * Book CRUD API backed by Supabase PostgreSQL via Prisma
 * Caching: Upstash Redis (5 min TTL, invalidated on writes)
 * Rate limited: 100 reads/min public, 20 writes/min admin
 */
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  cacheGet,
  cacheSet,
  cacheDel,
  cacheInvalidatePattern,
  booksReadRatelimit,
  booksWriteRatelimit,
} from '@/lib/redis';
import { z } from 'zod';
import { Book } from '@/types/book';
import { triggerAutomatedNewsletterBroadcast } from '@/lib/newsletter-automation';

export const runtime = 'nodejs';

const CACHE_KEY_ALL = 'books:all';
const CACHE_KEY_BOOK = (slug: string) => `books:${slug}`;

const BookInputSchema = z.object({
  slug: z.string().optional(),
  title: z.string().min(1, 'Title is required.').max(200),
  subtitle: z.string().max(300).optional(),
  seriesName: z.string().max(200).optional(),
  volumeNumber: z.number().int().optional(),
  genre: z.string().min(1, 'Genre is required.'),
  tags: z.array(z.string()).or(z.string()).optional(),
  shortDescription: z.string().min(1, 'Short description is required.'),
  fullSynopsis: z.string().min(1, 'Full synopsis is required.'),
  releaseDate: z
    .string()
    .optional()
    .default(() => new Date().toISOString().split('T')[0]),
  isbn: z.string().nullable().optional(),
  language: z.string().optional().default('English'),
  pages: z.number().int().nullable().optional(),
  readingTime: z.string().nullable().optional(),
  status: z.enum(['published', 'coming-soon', 'draft']).optional().default('published'),
  coverUrl: z.string().url('Invalid cover URL').or(z.literal('')).nullable().optional(),
  bannerUrl: z.string().url('Invalid banner URL').or(z.literal('')).nullable().optional(),
  trailerLink: z.string().url('Invalid trailer URL').or(z.literal('')).nullable().optional(),
  samplePdfUrl: z.string().url('Invalid sample PDF URL').or(z.literal('')).nullable().optional(),
  previewUrl: z.string().url('Invalid preview URL').or(z.literal('')).nullable().optional(),
  amazonLink: z.string().url('Invalid Amazon URL').or(z.literal('')).nullable().optional(),
  googlePlayLink: z.string().url('Invalid Google Play URL').or(z.literal('')).nullable().optional(),
  appleBooksLink: z.string().url('Invalid Apple Books URL').or(z.literal('')).nullable().optional(),
  koboLink: z.string().url('Invalid Kobo URL').or(z.literal('')).nullable().optional(),
  paperbackLink: z.string().url('Invalid Paperback URL').or(z.literal('')).nullable().optional(),
  hardcoverLink: z.string().url('Invalid Hardcover URL').or(z.literal('')).nullable().optional(),
  officialWebsiteLink: z
    .string()
    .url('Invalid Website URL')
    .or(z.literal(''))
    .nullable()
    .optional(),
  customLink: z.string().url('Invalid Custom URL').or(z.literal('')).nullable().optional(),
  pocketFmLink: z.string().url('Invalid Pocket FM URL').or(z.literal('')).nullable().optional(),
  kukuFmLink: z.string().url('Invalid Kuku FM URL').or(z.literal('')).nullable().optional(),
  audibleLink: z.string().url('Invalid Audible URL').or(z.literal('')).nullable().optional(),
  storytelLink: z.string().url('Invalid Storytel URL').or(z.literal('')).nullable().optional(),
  ageRating: z.string().nullable().optional(),
  contentWarning: z.string().nullable().optional(),
  authorNotes: z.string().nullable().optional(),
  isFeatured: z.boolean().optional(),
  isBestseller: z.boolean().optional(),
  isEditorsChoice: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

async function isAdminAuthorized(req: NextRequest): Promise<boolean> {
  const adminCookie = req.cookies.get('admin_session')?.value;
  if (adminCookie) return true;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user && user.email) {
      const adminEmails = (process.env.ADMIN_EMAILS ?? '')
        .split(',')
        .map((e) => e.trim().toLowerCase());
      if (adminEmails.includes(user.email.toLowerCase())) return true;
    }
  } catch {}

  const passcode = req.headers.get('x-admin-passcode');
  const envPasscode = process.env.ADMIN_PASSCODE || process.env.NEXT_PUBLIC_ADMIN_PASSCODE;
  if (envPasscode && passcode === envPasscode) return true;

  return false;
}

function mapDbToBook(db: any): Book {
  return {
    slug: db.slug,
    title: db.title,
    subtitle: db.subtitle ?? '',
    seriesName: db.seriesName ?? '',
    volumeNumber: db.volumeNumber ?? undefined,
    genre: db.genre,
    tags: db.tags ? db.tags.split(',').filter(Boolean) : [],
    shortDescription: db.shortDescription,
    fullSynopsis: db.fullSynopsis,
    releaseDate: db.releaseDate,
    isbn: db.isbn ?? '',
    language: db.language,
    pages: db.pages ?? undefined,
    readingTime: db.readingTime ?? '',
    status: db.status as 'published' | 'coming-soon' | 'draft',
    coverUrl: db.coverUrl ?? '',
    bannerUrl: db.bannerUrl ?? '',
    trailerLink: db.trailerLink ?? '',
    buyLinks: {
      amazon: db.amazonLink ?? '',
      googlePlay: db.googlePlayLink ?? '',
      appleBooks: db.appleBooksLink ?? '',
      kobo: db.koboLink ?? '',
      paperback: db.paperbackLink ?? '',
      hardcover: db.hardcoverLink ?? '',
      officialWebsite: db.officialWebsiteLink ?? '',
      custom: db.customLink ?? '',
    },
    samplePdfUrl: db.samplePdfUrl ?? '',
    previewUrl: db.previewUrl ?? '',
    awards: db.awards ? db.awards.split(',').filter(Boolean) : [],
    isFeatured: !!db.isFeatured,
    isBestseller: !!db.isBestseller,
    isEditorsChoice: !!db.isEditorsChoice,
    displayOrder: db.displayOrder,
    seoTitle: db.seoTitle ?? '',
    seoDescription: db.seoDescription ?? '',
    socialShareImage: db.socialShareImage ?? '',
    authorNotes: db.authorNotes ?? '',
    ageRating: db.ageRating ?? '',
    contentWarning: db.contentWarning ?? '',
    lastUpdated:
      typeof db.lastUpdated === 'string'
        ? db.lastUpdated
        : new Date(db.lastUpdated ?? Date.now()).toISOString(),
  };
}

function mapBookToDb(book: any, slug: string) {
  return {
    slug,
    title: book.title,
    subtitle: book.subtitle || null,
    seriesName: book.seriesName || null,
    volumeNumber: book.volumeNumber || null,
    genre: book.genre,
    tags: Array.isArray(book.tags) ? book.tags.join(',') : '',
    shortDescription: book.shortDescription,
    fullSynopsis: book.fullSynopsis,
    releaseDate: book.releaseDate,
    isbn: book.isbn || null,
    language: book.language,
    pages: book.pages || null,
    readingTime: book.readingTime || null,
    status: book.status,
    coverUrl: book.coverUrl || null,
    bannerUrl: book.bannerUrl || null,
    trailerLink: book.trailerLink || null,
    samplePdfUrl: book.samplePdfUrl || null,
    previewUrl: book.previewUrl || null,
    awards: Array.isArray(book.awards) ? book.awards.join(',') : '',
    isFeatured: !!book.isFeatured,
    isBestseller: !!book.isBestseller,
    isEditorsChoice: !!book.isEditorsChoice,
    displayOrder: Number(book.displayOrder ?? 0),
    seoTitle: book.seoTitle || null,
    seoDescription: book.seoDescription || null,
    socialShareImage: book.socialShareImage || null,
    authorNotes: book.authorNotes || null,
    ageRating: book.ageRating || null,
    contentWarning: book.contentWarning || null,
    amazonLink: book.buyLinks?.amazon || (book as any).amazonLink || null,
    googlePlayLink: book.buyLinks?.googlePlay || (book as any).googlePlayLink || null,
    appleBooksLink: book.buyLinks?.appleBooks || (book as any).appleBooksLink || null,
    koboLink: book.buyLinks?.kobo || (book as any).koboLink || null,
    paperbackLink: book.buyLinks?.paperback || (book as any).paperbackLink || null,
    hardcoverLink: book.buyLinks?.hardcover || (book as any).hardcoverLink || null,
    officialWebsiteLink:
      book.buyLinks?.officialWebsite || (book as any).officialWebsiteLink || null,
    customLink: book.buyLinks?.custom || (book as any).customLink || null,
    pocketFmLink: (book as any).pocketFmLink || null,
    kukuFmLink: (book as any).kukuFmLink || null,
    audibleLink: (book as any).audibleLink || null,
    storytelLink: (book as any).storytelLink || null,
  };
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
  try {
    const { success: allowed } = await booksReadRatelimit.limit(ip);
    if (!allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }
  } catch {}

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  const supabase = await createClient();

  if (slug) {
    try {
      const cached = await cacheGet<Book>(CACHE_KEY_BOOK(slug));
      if (cached) return NextResponse.json(cached);
    } catch {}

    try {
      const { data: dbBook, error } = await supabase
        .from('Book')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error || !dbBook) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
      }
      const book = mapDbToBook(dbBook);
      try {
        await cacheSet(CACHE_KEY_BOOK(slug), book, 300);
      } catch {}
      return NextResponse.json(book);
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  try {
    const cached = await cacheGet<Book[]>(CACHE_KEY_ALL);
    if (cached) {
      return NextResponse.json(cached, {
        headers: { 'X-Cache': 'HIT' },
      });
    }
  } catch {}

  try {
    const { data: dbBooks, error } = await supabase
      .from('Book')
      .select('*')
      .order('displayOrder', { ascending: true });
    if (error) throw error;

    const books = (dbBooks || []).map(mapDbToBook);
    try {
      await cacheSet(CACHE_KEY_ALL, books, 300);
    } catch {}

    return NextResponse.json(books, {
      headers: { 'X-Cache': 'MISS' },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthorized(req))) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin authentication required.' },
      { status: 401 }
    );
  }

  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
  try {
    const { success: allowed } = await booksWriteRatelimit.limit(ip);
    if (!allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }
  } catch {}

  try {
    const body = await req.json();
    const parsed = BookInputSchema.safeParse(body);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues
        .map((issue) => `${issue.path.join('.') || 'field'}: ${issue.message}`)
        .join(', ');
      return NextResponse.json(
        { error: `Validation failed: ${errorMsg}`, details: parsed.error.issues },
        { status: 400 }
      );
    }

    const validatedData = parsed.data;
    const slug = validatedData.slug || slugify(validatedData.title);
    const data = mapBookToDb({ ...validatedData, slug }, slug);

    const supabase = await createClient();
    const { data: created, error } = await supabase.from('Book').insert(data).select().single();
    if (error) throw error;

    const book = mapDbToBook(created);

    // Automated Newsletter Broadcast trigger for new published books
    if (book.status === 'published') {
      try {
        await triggerAutomatedNewsletterBroadcast({
          type: 'book',
          title: book.title,
          subtitle: book.subtitle,
          summary: book.shortDescription || book.fullSynopsis.slice(0, 200),
          url: `/books/${book.slug}`,
          coverUrl: book.coverUrl,
        });
      } catch (newsletterErr) {
        console.error('[Automated Newsletter Trigger Error - Book]', newsletterErr);
      }
    }

    try {
      await cacheInvalidatePattern('books:*');
      await cacheDel(CACHE_KEY_ALL);
    } catch {}

    return NextResponse.json({ success: true, book }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to create book in database' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminAuthorized(req))) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin authentication required.' },
      { status: 401 }
    );
  }

  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
  try {
    const { success: allowed } = await booksWriteRatelimit.limit(ip);
    if (!allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }
  } catch {}

  try {
    const body = await req.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug parameter.' }, { status: 400 });
    }

    const parsed = BookInputSchema.safeParse(body);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues
        .map((issue) => `${issue.path.join('.') || 'field'}: ${issue.message}`)
        .join(', ');
      return NextResponse.json(
        { error: `Validation failed: ${errorMsg}`, details: parsed.error.issues },
        { status: 400 }
      );
    }

    const validatedData = parsed.data;
    const data = mapBookToDb({ ...validatedData, slug }, slug);

    const supabase = await createClient();
    const { data: updated, error } = await supabase
      .from('Book')
      .update(data)
      .eq('slug', slug)
      .select()
      .single();

    if (error) throw error;

    const book = mapDbToBook(updated);

    try {
      await Promise.all([cacheDel(CACHE_KEY_BOOK(slug)), cacheDel(CACHE_KEY_ALL)]);
    } catch {}

    return NextResponse.json({ success: true, book });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthorized(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
  try {
    const { success: allowed } = await booksWriteRatelimit.limit(ip);
    if (!allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }
  } catch {}

  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.from('Book').delete().eq('slug', slug);
    if (error) throw error;

    try {
      await Promise.all([cacheDel(CACHE_KEY_BOOK(slug)), cacheDel(CACHE_KEY_ALL)]);
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to delete book' }, { status: 500 });
  }
}
