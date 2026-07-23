import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { redis, cacheGet, cacheSet, cacheDel } from '@/lib/redis';

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

function verifyAdminPasscode(req: Request) {
  const passcode = req.headers.get('x-admin-passcode');
  const validPasscode = process.env.ADMIN_PASSCODE || 'Rkraj@8789';
  return passcode === validPasscode;
}

// GET all blog posts or single post by slug
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const status = searchParams.get('status');

    if (slug) {
      const cacheKey = `posts:${slug}`;
      const cached = await cacheGet(cacheKey);
      if (cached) return NextResponse.json(cached);

      const post = await prisma.post.findUnique({
        where: { slug },
        include: { comments: true },
      });

      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      await cacheSet(cacheKey, post, 300);
      return NextResponse.json(post);
    }

    const cacheKey = status ? `posts:status:${status}` : 'posts:all';
    const cached = await cacheGet(cacheKey);
    if (cached) return NextResponse.json(cached);

    const whereClause = status ? { status } : {};
    const posts = await prisma.post.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    await cacheSet(cacheKey, posts, 300);
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: 'Failed to query blog posts database' }, { status: 500 });
  }
}

// POST create blog post
export async function POST(req: Request) {
  if (!verifyAdminPasscode(req)) {
    return NextResponse.json({ error: 'Unauthorized: Invalid admin passcode' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = PostSchema.parse(body);

    const post = await prisma.post.create({
      data: {
        ...validated,
        publishedAt: validated.publishedAt ? new Date(validated.publishedAt) : new Date(),
      },
    });

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

// PUT update blog post
export async function PUT(req: Request) {
  if (!verifyAdminPasscode(req)) {
    return NextResponse.json({ error: 'Unauthorized: Invalid admin passcode' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { originalSlug, ...data } = body;
    const validated = PostSchema.parse(data);

    const post = await prisma.post.update({
      where: { slug: originalSlug || validated.slug },
      data: {
        ...validated,
        publishedAt: validated.publishedAt ? new Date(validated.publishedAt) : new Date(),
      },
    });

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

// DELETE post
export async function DELETE(req: Request) {
  if (!verifyAdminPasscode(req)) {
    return NextResponse.json({ error: 'Unauthorized: Invalid admin passcode' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
    }

    await prisma.post.delete({ where: { slug } });
    await cacheDel('posts:all');
    await cacheDel(`posts:${slug}`);

    return NextResponse.json({ success: true, message: `Post ${slug} deleted successfully` });
  } catch {
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
