import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

// GET: Load approved comments for a specific post slug
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postSlug = searchParams.get('postSlug');

  if (!postSlug) {
    return NextResponse.json({ error: 'Missing postSlug parameter' }, { status: 400 });
  }

  try {
    const isPlaceholder =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    if (isPlaceholder) {
      return NextResponse.json([]);
    }

    const { data: comments, error } = await supabase
      .from('comments')
      .select('id, name, email_hash, body, created_at')
      .eq('post_id', postSlug)
      .eq('status', 'approved')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json(comments || []);
  } catch (err: any) {
    return NextResponse.json([], { status: 200 });
  }
}

// POST: Submit a new comment (defaults to status 'pending')
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, text, postSlug } = body;

    // Validation (Task 17.4: Empty State Form Validation)
    if (!name?.trim() || !email?.trim() || !text?.trim() || !postSlug?.trim()) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Input Stripping Regex Purger (Task 17.3)
    // Strip HTML tags to sanitize body and name inputs to prevent script injections
    const sanitizeInput = (val: string) => {
      return val.replace(/<[^>]*>/g, '').trim();
    };

    const sanitizedName = sanitizeInput(name);
    const sanitizedText = sanitizeInput(text);

    if (!sanitizedName || !sanitizedText) {
      return NextResponse.json({ error: 'Invalid comment contents' }, { status: 400 });
    }

    // Hash email for Gravatar support (Task 17.5)
    const emailHash = crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');

    // Insert pending comment into Supabase
    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: postSlug.trim(),
        name: sanitizedName,
        email_hash: emailHash,
        body: sanitizedText,
        status: 'pending', // RLS enforces only inserting 'pending' state
      })
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, comment: data?.[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
