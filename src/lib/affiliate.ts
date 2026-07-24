/**
 * src/lib/affiliate.ts
 * Amazon Associates Affiliate Link Utility
 * Automatically appends associate tag to all Amazon store & paperback links
 */

const DEFAULT_TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || 'nobikumar-21';

/**
 * Format an Amazon product URL to include the Amazon Associate tag
 * @param url - Raw Amazon URL or ASIN/DP link
 * @param tag - Optional custom associate tag
 */
export function getAmazonAffiliateLink(url?: string | null, tag: string = DEFAULT_TAG): string {
  if (!url) return '';
  if (!url.includes('amazon.') && !url.includes('a.co')) return url;

  try {
    const parsedUrl = new URL(url);
    parsedUrl.searchParams.set('tag', tag);
    return parsedUrl.toString();
  } catch {
    if (url.includes('?')) {
      return `${url}&tag=${tag}`;
    }
    return `${url}?tag=${tag}`;
  }
}

/**
 * Standard Amazon Associates Earnings Disclaimer for legal compliance
 */
export const AMAZON_AFFILIATE_DISCLAIMER =
  'As an Amazon Associate, I earn from qualifying purchases. When you buy through links on this site, I may earn an affiliate commission at no extra cost to you.';
