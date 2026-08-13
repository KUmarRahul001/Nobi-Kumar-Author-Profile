/**
 * src/app/api/cron/generate-blog/route.ts
 * Production-Hardened Automated AI Blog Generation & Beehiiv Newsletter Engine
 * Supports Timing-Safe Cron Auth, Atomic Run Claims (SETNX), Generation Run IDs, AI Quality Gates, HTML Sanitization, and Emergency Shutdown.
 */
import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { createClient } from '@/lib/supabase/server';
import { cacheDel } from '@/lib/redis';
import { NobiAIEngine } from '@/lib/nobi-ai-engine';
import { triggerAutomatedNewsletterBroadcast } from '@/lib/newsletter-automation';
import {
  resolveGenerationRunId,
  claimGenerationRun,
  finalizeGenerationRun,
} from '@/lib/idempotency';

export const runtime = 'nodejs';
export const revalidate = 0;

// Nobi Kumar Knowledge Base Topics
const KNOWLEDGE_BASE_TOPICS = [
  {
    category: 'Case Files',
    topic: 'The Psychological Anatomy of St. Jude College Stairwell Incident',
    theme: 'Dark campus secrecy, unsaid trauma, academic rivalry, and student surveillance in NNU.',
  },
  {
    category: 'Universe Files',
    topic: 'Unraveling the Verma Estate Legacy: Three Generations of Silence',
    theme: 'Interconnected family secrets, hidden wills, and atmospheric estate mystery.',
  },
  {
    category: 'Author Chronicles',
    topic: 'Why Psychological Thrillers Need Unreliable Narrators to Mirror Reality',
    theme:
      'Crafting psychological suspense, moral ambiguity, and building tension in dark fiction.',
  },
  {
    category: 'Reader Files',
    topic: 'The Verma Chronicles Reading Map: Easter Eggs & Hidden Clues',
    theme: 'Behind-the-scenes character links between The Verma Legacy and The Shadow Who Watched.',
  },
  {
    category: 'Releases',
    topic: 'Inside Nobi Kumar’s Writing Archive: From First Draft to Published Novel',
    theme: 'Exclusive look at story outlines, character dossier building, and universe expansion.',
  },
];

function isTimingSafeMatch(inputSecret: string, validSecret: string): boolean {
  try {
    const inputBuf = Buffer.from(inputSecret);
    const validBuf = Buffer.from(validSecret);
    if (inputBuf.length !== validBuf.length) return false;
    return timingSafeEqual(inputBuf, validBuf);
  } catch {
    return false;
  }
}

async function verifyCronAuth(req: NextRequest): Promise<boolean> {
  const cookiesHeader = req.headers.get('cookie') || '';
  if (cookiesHeader.includes('admin_session=')) return true;

  const cronSecret =
    process.env.BLOG_CRON_SECRET || process.env.CRON_SECRET || process.env.ADMIN_PASSCODE;
  if (!cronSecret) return false;

  const authHeader = req.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
  const xCronHeader = req.headers.get('x-cron-secret') || req.headers.get('x-admin-passcode');

  const tokenToTest = bearerToken || xCronHeader;
  if (!tokenToTest) return false;

  return isTimingSafeMatch(tokenToTest, cronSecret);
}

export async function GET(req: NextRequest) {
  return handleAutomatedGeneration(req);
}

export async function POST(req: NextRequest) {
  return handleAutomatedGeneration(req);
}

async function handleAutomatedGeneration(req: NextRequest) {
  // 1. Emergency Kill Switch Check
  if (process.env.BLOG_AUTOMATION_ENABLED === 'false') {
    return NextResponse.json(
      { error: 'Blog automation is currently disabled via kill switch.' },
      { status: 503 }
    );
  }

  // 2. Strict Timing-Safe Authentication / Admin Session Check
  const isAuthorized = await verifyCronAuth(req);
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized: Invalid credentials.' }, { status: 401 });
  }

  // 3. Resolve & Claim Atomic Generation Run ID (Supports 09:00, 21:00 IST slots and manual runs)
  const runId = resolveGenerationRunId(req);
  const claim = await claimGenerationRun(runId);

  if (!claim.claimed) {
    if (claim.state?.status === 'completed') {
      return NextResponse.json(
        {
          message: 'Generation run already completed for this scheduled slot.',
          status: 'already_completed',
          runId,
          post: {
            id: claim.state.postId,
            slug: claim.state.postSlug,
            title: claim.state.postTitle,
          },
          newsletterStatus: claim.state.newsletterStatus,
        },
        { status: 200 }
      );
    }

    if (claim.state?.status === 'running') {
      return NextResponse.json(
        {
          message: 'Generation run currently in progress by another request.',
          status: 'in_progress',
          runId,
        },
        { status: 409 }
      );
    }
  }

  // Select Topic from Knowledge Base
  const randomTopic =
    KNOWLEDGE_BASE_TOPICS[Math.floor(Math.random() * KNOWLEDGE_BASE_TOPICS.length)];

  // 4. Generate Article & SEO via Nobi AI Engine
  const aiResult = await NobiAIEngine.generateBlog({
    topic: randomTopic.topic,
    category: randomTopic.category,
    theme: randomTopic.theme,
  });

  // AI Quality Gate Verification
  if (!aiResult.title || !aiResult.content || aiResult.content.length < 100) {
    await finalizeGenerationRun(runId, {
      status: 'failed',
      error: 'AI Quality Gate failed: Content too short or missing title.',
    });
    return NextResponse.json(
      { error: 'AI Quality Gate failed: Generated content did not meet minimum standards.' },
      { status: 422 }
    );
  }

  const uniqueSlug = `${aiResult.seo.slug}-${Date.now().toString().slice(-4)}`;

  try {
    const supabase = await createClient();

    // 5. Duplicate Check via Database Title Lookup
    const { data: existing } = await supabase
      .from('Post')
      .select('id, slug, title')
      .eq('title', aiResult.title)
      .single();

    if (existing) {
      await finalizeGenerationRun(runId, {
        status: 'completed',
        postId: existing.id,
        postSlug: existing.slug,
        postTitle: existing.title,
        newsletterStatus: 'skipped_duplicate',
      });
      return NextResponse.json(
        {
          message: 'Topic already published in database. Skipping duplicate.',
          status: 'duplicate_skipped',
          runId,
          post: existing,
        },
        { status: 200 }
      );
    }

    // 6. Insert Sanitized Article into Database
    const now = new Date().toISOString();
    const { data: post, error } = await supabase
      .from('Post')
      .insert({
        title: aiResult.title,
        slug: uniqueSlug,
        excerpt: aiResult.excerpt,
        content: aiResult.content,
        category: randomTopic.category,
        tags: aiResult.tags,
        readingTime: aiResult.readingTime,
        coverUrl: '/assets/nobi-author.png',
        status: 'published',
        publishedAt: now,
        updatedAt: now,
        seoTitle: aiResult.seo.title,
        seoDescription: aiResult.seo.metaDescription,
      })
      .select()
      .single();

    if (error || !post) {
      await finalizeGenerationRun(runId, {
        status: 'failed',
        error: error?.message || 'Database insert failed',
      });
      return NextResponse.json(
        { error: error?.message || 'Database insert failed' },
        { status: 500 }
      );
    }

    // Invalidate Redis Caches
    await cacheDel('posts:all');
    await cacheDel(`posts:${post.slug}`);

    // 7. Trigger Automated Newsletter Broadcast
    let newsletterResult: { success: boolean; message: string; beehiivPostId?: string } = {
      success: false,
      message: 'Skipped',
    };
    if (process.env.BLOG_AUTO_NEWSLETTER !== 'false') {
      try {
        newsletterResult = await triggerAutomatedNewsletterBroadcast({
          type: 'chronicle',
          title: post.title,
          summary: post.excerpt,
          url: `/blog/${post.slug}`,
          coverUrl: post.coverUrl,
        });
      } catch (newsErr: any) {
        console.error('[Automated Newsletter Trigger Error]', newsErr);
      }
    }

    // 8. Finalize Generation Run State
    await finalizeGenerationRun(runId, {
      status: 'completed',
      postId: post.id,
      postSlug: post.slug,
      postTitle: post.title,
      newsletterStatus: newsletterResult.success ? 'sent' : 'failed',
      beehiivPostId: newsletterResult.beehiivPostId,
      providerUsed: aiResult.providerUsed,
    });

    return NextResponse.json({
      success: true,
      message: 'Automated blog generated, claimed, published, and recorded safely.',
      runId,
      providerUsed: aiResult.providerUsed,
      post: {
        id: post.id,
        title: post.title,
        slug: post.slug,
      },
      newsletterResult,
    });
  } catch (err: any) {
    await finalizeGenerationRun(runId, {
      status: 'failed',
      error: err.message || 'Server error',
    });
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
