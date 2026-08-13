/**
 * src/lib/__tests__/ai_system_security.test.ts
 * Vitest Security Suite for Automated AI Blog & Newsletter System
 */
import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from '../content-sanitizer';
import { generateAndValidateSEO } from '../seo-validator';

describe('AI System Security & Sanitization Unit Tests', () => {
  it('strips malicious script tags from AI output', () => {
    const maliciousInput = '<h1>Title</h1><script>alert("xss")</script><p>Clean content</p>';
    const cleanOutput = sanitizeHtml(maliciousInput);
    expect(cleanOutput).not.toContain('<script>');
    expect(cleanOutput).not.toContain('alert');
    expect(cleanOutput).toContain('<h1>Title</h1>');
  });

  it('strips iframe injections and javascript event handlers', () => {
    const maliciousInput =
      '<div onclick="stealTokens()">Click</div><iframe src="http://attacker.com"></iframe>';
    const cleanOutput = sanitizeHtml(maliciousInput);
    expect(cleanOutput).not.toContain('onclick');
    expect(cleanOutput).not.toContain('iframe');
  });

  it('validates and truncates SEO titles and descriptions safely', () => {
    const longTitle =
      'A Very Long Title Exceeding Expected Search Engine Bounds For Modern Browsers And SEO Standards';
    const excerpt = 'Short hook excerpt';
    const seo = generateAndValidateSEO(longTitle, excerpt, 'test-slug');

    expect(seo.ogTitle.length).toBeLessThanOrEqual(60);
    expect(seo.metaDescription.length).toBeLessThanOrEqual(155);
    expect(seo.canonicalUrl).toContain('/blog/test-slug');
  });
});
