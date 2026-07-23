/**
 * src/app/api/contact/route.ts
 * Contact form submissions — saves to Prisma DB
 * Rate limited via Upstash Redis
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactRatelimit } from '@/lib/redis';
import { z } from 'zod';

export const runtime = 'nodejs';

// Sanitize HTML to prevent XSS injection
function sanitize(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.').max(100),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().max(200).optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters.')
    .max(5000, 'Message is too long.'),
});

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? '127.0.0.1';
  const { success: allowed } = await contactRatelimit.limit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    await prisma.contactMessage.create({
      data: {
        name: sanitize(name),
        email: sanitize(email),
        subject: subject ? sanitize(subject) : null,
        message: sanitize(message),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Your message has been received. Thank you!',
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
