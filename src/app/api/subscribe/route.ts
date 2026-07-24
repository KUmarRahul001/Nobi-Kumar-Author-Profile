/**
 * src/app/api/subscribe/route.ts
 * Newsletter subscription — saves to Prisma DB + syncs to Beehiiv & Mailchimp
 * Rate limited via Upstash Redis
 */
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { subscribeRatelimit } from '@/lib/redis';
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
        { error: parsed.error.issues[0]?.message ?? 'Invalid email address' },
        { status: 400 }
      );
    }

    const { email, name } = parsed.data;

    console.log('[Subscribe API] Processing request for:', { email, name });

    // 1. Save/update in Supabase DB
    try {
      const supabase = await createClient();
      console.log('[Subscribe API] Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

      const payload = {
        id: crypto.randomUUID(),
        email,
        name: name ?? null,
        status: 'active',
      };

      console.log('[Subscribe API] Inserting into "Subscriber":', payload);

      const { data, error, status } = await supabase
        .from('Subscriber')
        .upsert(payload, { onConflict: 'email' })
        .select();

      console.log('[Subscribe API] Supabase Response:', { data, error, status });

      if (error) {
        console.error('[Supabase Upsert Error Details]:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
      }
    } catch (sbErr) {
      console.error('[Subscribe API] Exception during Supabase upsert:', sbErr);
    }

    // 2. Sync to Beehiiv API V2 if BEEHIIV_API_KEY is configured server-side
    const beehiivApiKey = process.env.BEEHIIV_API_KEY;
    const publicationId =
      process.env.BEEHIIV_PUBLICATION_ID ||
      process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID ||
      'pub_f065d229-fd93-42da-8257-d761649484cd';

    console.log('[Subscribe API] Beehiiv config check:', {
      hasKey: Boolean(beehiivApiKey),
      publicationId,
    });

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
        console.log('[Subscribe API] Beehiiv Response:', { status: bhRes.status, data: bhData });
      } catch (bhErr) {
        console.error('Beehiiv API sync error:', bhErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! You have successfully subscribed to The Nobi Kumar Newsletter.',
    });
  } catch (err: any) {
    console.error('[Subscribe API] Global Handler Error:', err);
    return NextResponse.json({ error: 'Subscription failed. Please try again.' }, { status: 500 });
  }
}
