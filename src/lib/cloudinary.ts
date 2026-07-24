/**
 * src/lib/cloudinary.ts
 * Cloudinary SDK configuration for server-side image uploads
 * Used in /api/upload route for book covers and banners
 */
import { v2 as cloudinary } from 'cloudinary';

const cloudName =
  process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'Missing required Cloudinary environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET).'
    );
  }
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export default cloudinary;

export const CLOUDINARY_FOLDERS = {
  BOOKS: 'nobi-kumar/books',
  AUTHORS: 'nobi-kumar/authors',
  BLOG: 'nobi-kumar/blog',
  GALLERY: 'nobi-kumar/gallery',
} as const;

/**
 * Helper to get optimized Cloudinary image URLs with responsive transformations
 */
export function getOptimizedImageUrl(
  url: string,
  options: { width?: number; height?: number; crop?: string; quality?: string } = {}
): string {
  if (!url.includes('cloudinary.com')) return url;

  const { width, height, crop = 'limit', quality = 'auto' } = options;
  const transformations = [`f_auto`, `q_${quality}`];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);

  const transformString = transformations.join(',');
  return url.replace('/upload/', `/upload/${transformString}/`);
}

/**
 * Upload a buffer/base64 image to Cloudinary
 * @param fileBuffer - Buffer or base64 data URI
 * @param folder - Cloudinary folder (e.g. 'nobi-kumar/books')
 * @param publicId - Optional explicit public_id
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer | string,
  folder: string = CLOUDINARY_FOLDERS.BOOKS,
  publicId?: string
): Promise<{ url: string; publicId: string; width: number; height: number }> {
  const uploadOptions: Record<string, unknown> = {
    folder,
    resource_type: 'image',
    ...(publicId ? { public_id: publicId, overwrite: true } : {}),
  };

  let result;
  if (typeof fileBuffer === 'string' && fileBuffer.startsWith('http')) {
    result = await cloudinary.uploader.upload(fileBuffer, uploadOptions);
  } else {
    // Convert Buffer or base64 to base64 Data URI
    const base64Payload =
      typeof fileBuffer === 'string'
        ? fileBuffer.startsWith('data:')
          ? fileBuffer
          : `data:image/png;base64,${fileBuffer}`
        : `data:image/png;base64,${fileBuffer.toString('base64')}`;

    result = await cloudinary.uploader.upload(base64Payload, uploadOptions);
  }

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  };
}

/**
 * Delete an image from Cloudinary by public_id
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}
