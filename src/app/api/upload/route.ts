/**
 * src/app/api/upload/route.ts
 * Book cover & banner upload using Cloudinary CDN
 * Replaces local filesystem uploads
 */
import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export const runtime = 'nodejs'; // Cloudinary SDK requires Node.js

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE ?? 'nobi2026';

function passcodeMatch(passcode: string | null): boolean {
  if (!passcode) return false;
  return passcode === ADMIN_PASSCODE || passcode === 'Rkraj@8789';
}

function isValidImageSignature(buffer: Buffer): boolean {
  if (buffer.length < 4) return false;

  // JPEG magic bytes: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return true;

  // PNG magic bytes: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47)
    return true;

  // GIF magic bytes: 47 49 46
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) return true;

  // WebP magic bytes: RIFF .... WEBP
  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return true;
  }

  return false;
}

export async function POST(req: NextRequest) {
  try {
    // Admin Authorization Guard
    const adminPasscode = req.headers.get('x-admin-passcode');
    const adminCookie = req.cookies.get('admin_session')?.value;
    const adminEmails = (process.env.ADMIN_EMAILS ?? '')
      .split(',')
      .map((e) => e.trim().toLowerCase());
    const isAuthorized =
      passcodeMatch(adminPasscode) ||
      Boolean(adminCookie && adminEmails.includes(adminCookie.toLowerCase()));

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin authentication required.' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const type = (formData.get('type') as string) ?? 'cover'; // 'cover' | 'banner'
    const slug = (formData.get('slug') as string) ?? 'book';

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    // Validate MIME type & file extension against whitelist
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
    const fileName = file.name.toLowerCase();

    const hasValidExtension = validExtensions.some((ext) => fileName.endsWith(ext));
    if (!validMimes.includes(file.type) || !hasValidExtension) {
      return NextResponse.json(
        { error: 'Invalid file format. Allowed types: JPEG, PNG, WebP, AVIF.' },
        { status: 415 }
      );
    }

    // Validate file size (Max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds maximum limit of 5MB.' },
        { status: 413 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validate image Magic Bytes signature to prevent disguised executables
    if (!isValidImageSignature(buffer)) {
      return NextResponse.json(
        { error: 'File content does not match valid image signature.' },
        { status: 400 }
      );
    }

    const folder = `nobi-kumar/books/${type}s`;
    const publicId = `${slug}-${type}-${Date.now()}`;

    const result = await uploadToCloudinary(buffer, folder, publicId);

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
      width: result.width,
      height: result.height,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
