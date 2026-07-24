/**
 * src/lib/cloudinary.ts
 * Cloudinary SDK configuration for server-side image uploads
 * Used in /api/upload route for book covers and banners
 */
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
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
  return new Promise((resolve, reject) => {
    const uploadOptions: Record<string, unknown> = {
      folder,
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto',
      ...(publicId ? { public_id: publicId, overwrite: true } : {}),
    };

    const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error || !result) return reject(error ?? new Error('Upload failed'));
      resolve({
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      });
    });

    if (typeof fileBuffer === 'string') {
      cloudinary.uploader
        .upload(fileBuffer, uploadOptions)
        .then((result) =>
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
          })
        )
        .catch(reject);
    } else {
      uploadStream.end(fileBuffer);
    }
  });
}

/**
 * Delete an image from Cloudinary by public_id
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}
