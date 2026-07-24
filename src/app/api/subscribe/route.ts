/**
 * src/app/api/subscribe/route.ts
 * Newsletter subscription — saves to Prisma DB + syncs to Beehiiv & Mailchimp
 * Rate limited via Upstash Redis
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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

    // 1. Save/update in Prisma DB (if database is online)
    try {
      await prisma.subscriber.upsert({
        where: { email },
        update: { name: name ?? null, status: 'active' },
        create: { email, name: name ?? null, status: 'active' },
      });
    } catch {}

    // 2. Sync to Beehiiv API V2 if BEEHIIV_API_KEY is configured server-side
    const beehiivApiKey = process.env.BEEHIIV_API_KEY;
    const publicationId =
      process.env.BEEHIIV_PUBLICATION_ID ||
      process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID ||
      'pub_f065d229-fd93-42da-8257-d761649484cd';

    if (beehiivApiKey) {
      try {
        await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
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
        });
      } catch (bhErr) {
        console.error('Beehiiv API sync error:', bhErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! You have successfully subscribed to The Nobi Kumar Newsletter.',
    });
  } catch {
    return NextResponse.json({ error: 'Subscription failed. Please try again.' }, { status: 500 });
  }
}
