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
  const aiProvider = process.env.AI_PROVIDER || 'gemini';
  const newsletterEnabled = Boolean(process.env.BEEHIIV_API_KEY);

  let lastRun = null;
  let totalPosts = 0;

  try {
    const supabase = await createClient();
    const { data: latestPost } = await supabase
      .from('Post')
      .select('title, createdAt, publishedAt')
      .order('createdAt', { ascending: false })
      .limit(1)
      .single();

    if (latestPost) {
      lastRun = latestPost.publishedAt || latestPost.createdAt;
    }

    const { count } = await supabase.from('Post').select('*', { count: 'exact', head: true });
    totalPosts = count || 0;
  } catch {}

  return NextResponse.json({
    enabled,
    aiProvider,
    newsletterEnabled,
    lastRun,
    totalPosts,
    status: enabled ? 'OPERATIONAL' : 'EMERGENCY_STOPPED',
  });
}
