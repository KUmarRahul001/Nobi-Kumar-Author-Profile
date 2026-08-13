/**
 * src/lib/content-sanitizer.ts
 * HTML & Text Sanitizer to prevent XSS and malicious script injections in AI output
 */

export function sanitizeHtml(rawHtml: string): string {
  if (!rawHtml) return '';

  return (
    rawHtml
      // Strip executable scripts
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      // Strip iframe injections
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      // Strip event handlers (onload=, onerror=, onclick=, etc.)
      .replace(/\s*on\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '')
      // Strip javascript: URIs
      .replace(/href\s*=\s*["']?\s*javascript:[^"'>]+/gi, 'href="#"')
      .replace(/src\s*=\s*["']?\s*javascript:[^"'>]+/gi, 'src=""')
      .trim()
  );
}
