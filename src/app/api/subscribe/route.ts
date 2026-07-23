/**
 * src/app/api/subscribe/route.ts
 * Newsletter subscription — saves to Prisma DB + syncs to Mailchimp
 * Rate limited via Upstash Redis
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { subscribeToMailchimp } from '@/lib/mailchimp';
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
  const { success: allowed } = await subscribeRatelimit.limit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = SubscribeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      );
    }

    const { email, name } = parsed.data;
    const [firstName, ...rest] = (name ?? '').split(' ');
    const lastName = rest.join(' ');

    // 1. Save/update in Prisma DB (idempotent upsert)
    await prisma.subscriber.upsert({
      where: { email },
      update: { name: name ?? null, status: 'active' },
      create: { email, name: name ?? null, status: 'active' },
    });

    // 2. Sync to Mailchimp (non-blocking — don't fail if Mailchimp is down)
    const mcResult = await subscribeToMailchimp(email, firstName, lastName);

    return NextResponse.json({
      success: true,
      status: mcResult.status,
      message: mcResult.message,
    });
  } catch {
    return NextResponse.json({ error: 'Subscription failed. Please try again.' }, { status: 500 });
  }
}
