/**
 * src/app/api/admin/blog/retry-newsletter/route.ts
 * Admin-Only Newsletter Failure Recovery Endpoint
 * Retries sending the Beehiiv newsletter broadcast for an existing published post WITHOUT regenerating content or creating new posts.
 */
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { triggerAutomatedNewsletterBroadcast } from '@/lib/newsletter-automation';

export const runtime = 'nodejs';

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

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthorized(req))) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required.' }, { status: 401 });
  }

  try {
    const { slug } = await req.json();
    if (!slug) {
      return NextResponse.json({ error: 'Post slug is required.' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: post, error } = await supabase.from('Post').select('*').eq('slug', slug).single();

    if (error || !post) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }

    // Trigger newsletter broadcast only for existing post
    const newsletterResult = await triggerAutomatedNewsletterBroadcast({
      type: 'chronicle',
      title: post.title,
      summary: post.excerpt || post.content.slice(0, 200),
      url: `/blog/${post.slug}`,
      coverUrl: post.coverUrl,
    });

    return NextResponse.json({
      success: newsletterResult.success,
      message: newsletterResult.message,
      beehiivPostId: newsletterResult.beehiivPostId,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to retry newsletter' },
      { status: 500 }
    );
  }
}
