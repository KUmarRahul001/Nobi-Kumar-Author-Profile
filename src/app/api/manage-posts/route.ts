import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { cacheGet, cacheSet, cacheDel } from '@/lib/redis';

const PostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content body is required'),
  category: z.string().default('Chronicles'),
  tags: z.string().default(''),
  coverUrl: z.string().nullable().optional(),
  status: z.string().default('published'),
  publishedAt: z.string().nullable().optional(),
  readingTime: z.string().nullable().optional(),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
});

async function verifyAdminPasscode(req: Request): Promise<boolean> {
  const cookiesHeader = req.headers.get('cookie') || '';
  if (cookiesHeader.includes('admin_session=')) return true;

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
  const validPasscode = process.env.ADMIN_PASSCODE || process.env.NEXT_PUBLIC_ADMIN_PASSCODE;
  if (validPasscode && passcode === validPasscode) return true;

  return false;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const status = searchParams.get('status');

    const supabase = await createClient();

    if (slug) {
      const cacheKey = `posts:${slug}`;
      const cached = await cacheGet(cacheKey);
      if (cached) return NextResponse.json(cached);

      const { data: post, error } = await supabase
        .from('Post')
        .select('*, comments:Comment(*)')
        .eq('slug', slug)
        .single();

      if (error || !post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      await cacheSet(cacheKey, post, 300);
      return NextResponse.json(post);
    }

    const cacheKey = status ? `posts:status:${status}` : 'posts:all';
    const cached = await cacheGet(cacheKey);
    if (cached) return NextResponse.json(cached);

    let query = supabase.from('Post').select('*').order('createdAt', { ascending: false });
    if (status) {
      query = query.eq('status', status);
    }

    const { data: posts, error } = await query;
    if (error) throw error;

    await cacheSet(cacheKey, posts, 300);
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: 'Failed to query blog posts database' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await verifyAdminPasscode(req))) {
    return NextResponse.json({ error: 'Unauthorized: Invalid admin passcode' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = PostSchema.parse(body);

    const supabase = await createClient();
    const { data: post, error } = await supabase
      .from('Post')
      .insert({
        ...validated,
        publishedAt: validated.publishedAt
          ? new Date(validated.publishedAt).toISOString()
          : new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    await cacheDel('posts:all');
    await cacheDel(`posts:${post.slug}`);

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await verifyAdminPasscode(req))) {
    return NextResponse.json({ error: 'Unauthorized: Invalid admin passcode' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { originalSlug, ...data } = body;
    const validated = PostSchema.parse(data);

    const supabase = await createClient();
    const targetSlug = originalSlug || validated.slug;
    const { data: post, error } = await supabase
      .from('Post')
      .update({
        ...validated,
        publishedAt: validated.publishedAt
          ? new Date(validated.publishedAt).toISOString()
          : new Date().toISOString(),
      })
      .eq('slug', targetSlug)
      .select()
      .single();

    if (error) throw error;

    await cacheDel('posts:all');
    await cacheDel(`posts:${post.slug}`);

    return NextResponse.json(post);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await verifyAdminPasscode(req))) {
    return NextResponse.json({ error: 'Unauthorized: Invalid admin passcode' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.from('Post').delete().eq('slug', slug);
    if (error) throw error;

    await cacheDel('posts:all');
    await cacheDel(`posts:${slug}`);

    return NextResponse.json({ success: true, message: `Post ${slug} deleted successfully` });
  } catch {
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
