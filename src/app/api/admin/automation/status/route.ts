/**
 * src/app/api/admin/automation/status/route.ts
 * Admin-Only Automation Status & Health Monitor API
 */
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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

export async function GET(req: NextRequest) {
  const adminCookie = req.cookies.get('admin_session')?.value;
  const authHeader = req.headers.get('authorization');
  const passcodeHeader = req.headers.get('x-admin-passcode');

  if (!adminCookie && !authHeader && !passcodeHeader) {
    return NextResponse.json({ error: 'Unauthorized: Authentication required.' }, { status: 401 });
  }

  if (!(await isAdminAuthorized(req))) {
    return NextResponse.json(
      { error: 'Forbidden: Administrator privileges required.' },
      { status: 403 }
    );
  }

  const enabled = process.env.BLOG_AUTOMATION_ENABLED !== 'false';
  const aiPrimaryProvider =
    process.env.AI_PRIMARY_PROVIDER || process.env.AI_PROVIDER || 'openrouter';
  const openrouterFreeOnly = process.env.OPENROUTER_FREE_ONLY !== 'false';
  const newsletterEnabled = Boolean(process.env.BEEHIIV_API_KEY);

  // Calculate Next IST Slots
  const now = new Date();
  const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  const hour = istTime.getUTCHours();

  const todayStr = istTime.toISOString().split('T')[0];
  const nextSlot09 = hour < 9 ? `${todayStr}T09:00:00+05:30` : `Tomorrow 09:00 IST`;
  const nextSlot21 = hour < 21 ? `${todayStr}T21:00:00+05:30` : `Tomorrow 21:00 IST`;

  let lastRun = null;
  let totalPosts = 0;
  let latestPostDetails = null;

  try {
    const supabase = await createClient();
    const { data: latestPost } = await supabase
      .from('Post')
      .select('id, title, slug, createdAt, publishedAt')
      .order('createdAt', { ascending: false })
      .limit(1)
      .single();

    if (latestPost) {
      lastRun = latestPost.publishedAt || latestPost.createdAt;
      latestPostDetails = {
        id: latestPost.id,
        title: latestPost.title,
        slug: latestPost.slug,
      };
    }

    const { count } = await supabase.from('Post').select('*', { count: 'exact', head: true });
    totalPosts = count || 0;
  } catch {}

  return NextResponse.json({
    enabled,
    schedule: {
      slots: ['09:00 Asia/Kolkata', '21:00 Asia/Kolkata'],
      next0900Slot: nextSlot09,
      next2100Slot: nextSlot21,
      timezone: 'Asia/Kolkata',
    },
    aiConfig: {
      primaryProvider: aiPrimaryProvider,
      freeOnly: openrouterFreeOnly,
    },
    newsletterEnabled,
    lastRun,
    latestPost: latestPostDetails,
    totalPosts,
    status: enabled ? 'OPERATIONAL' : 'EMERGENCY_STOPPED',
  });
}
