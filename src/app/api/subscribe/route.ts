import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { subscribeRatelimit } from '@/lib/redis';
import { subscribeToMailchimp } from '@/lib/mailchimp';
import { z } from 'zod';

export const runtime = 'nodejs';

const SubscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  name: z.string().max(100).optional(),
});

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? '127.0.0.1';
  try {
    const { success: allowed } = await subscribeRatelimit.limit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a few minutes.' },
        { status: 429 }
      );
    }
  } catch {}

  try {
    const body = await req.json();
    const parsed = SubscribeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const { email, name } = parsed.data;

    console.log('[Subscribe API] Processing request for:', { email, name });

    // 1. Save/update in Supabase DB
    try {
      const supabase = await createClient();
      const payload = {
        id: crypto.randomUUID(),
        email,
        name: name ?? null,
        status: 'active',
      };

      const { data, error } = await supabase
        .from('Subscriber')
        .upsert(payload, { onConflict: 'email' })
        .select();

      if (error) {
        console.error('[Subscribe API] Supabase error:', error.message);
      } else {
        console.log('[Subscribe API] Supabase upsert success');
      }
    } catch (sbErr) {
      console.error('[Subscribe API] Exception during Supabase upsert:', sbErr);
    }

    // 2. Sync to Beehiiv API V2 (Primary Production Newsletter Provider)
    const beehiivApiKey = process.env.BEEHIIV_API_KEY;
    const publicationId =
      process.env.BEEHIIV_PUBLICATION_ID ||
      process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID ||
      'pub_f065d229-fd93-42da-8257-d761649484cd';

    if (beehiivApiKey) {
      try {
        const bhRes = await fetch(
          `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${beehiivApiKey}`,
            },
            body: JSON.stringify({
              email,
              reactivate_existing: true,
              send_welcome_email: true,
              utm_source: 'author_website',
            }),
          }
        );
        const bhData = await bhRes.json().catch(() => ({}));
        console.log('[Subscribe API] Beehiiv V2 Sync Response:', {
          status: bhRes.status,
          data: bhData,
        });
      } catch (bhErr) {
        console.error('[Subscribe API] Beehiiv API sync error:', bhErr);
      }
    } else {
      console.warn('[Subscribe API] BEEHIIV_API_KEY is not configured. Skipping Beehiiv sync.');
    }

    // 3. Optional Mailchimp Sync (Fallback)
    const mailchimpKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    if (mailchimpKey && audienceId && audienceId !== 'your-audience-list-id') {
      try {
        await subscribeToMailchimp(email, name);
        console.log('[Subscribe API] Mailchimp sync success');
      } catch (mcErr) {
        console.error('[Subscribe API] Mailchimp optional sync error:', mcErr);
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "Thanks for subscribing!\nYou'll receive exclusive updates, free chapters, behind-the-scenes content, and early access to upcoming books.",
    });
  } catch (err: unknown) {
    console.error('[Subscribe API] Global Handler Error:', err);
    return NextResponse.json({ error: 'Subscription failed. Please try again.' }, { status: 500 });
  }
}
