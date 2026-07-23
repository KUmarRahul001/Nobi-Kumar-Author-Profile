# Non-Functional Requirements (NFR)

## NFR-01 Performance
- First contentful paint should be fast on mid-range mobile devices.
- Image assets must be optimized.
- Blog and book pages should stream quickly.

## NFR-02 Accessibility
- WCAG 2.2 AA target
- Full keyboard navigation
- Color contrast suitable for dark theme
- Form labels and error messages accessible
- Reduced motion support

## NFR-03 Security
- Input validation on all forms
- Rate limiting on contact and comment endpoints
- Spam protection for newsletter and comments
- Safe HTML sanitization for rich text
- Principle of least privilege for admin operations

## NFR-04 Reliability
- Contact and newsletter submission failures must be recoverable
- Retailer link failures must degrade gracefully
- Comment moderation queue must be durable

## NFR-05 Maintainability
- Content and code separated
- Clear folder boundaries
- Type-safe data models
- Reusable UI components
- Traceable requirement IDs

## NFR-06 SEO
- Indexable content pages
- Canonical URLs
- Open Graph metadata
- Schema.org structured data
- Sitemap and robots support

## NFR-07 Observability
- Analytics events for CTA clicks, search, sample reads, newsletter submits
- Error logging for forms and content load failures
- Basic uptime monitoring

## NFR-08 Compatibility
- Latest Chrome, Safari, Firefox, Edge
- Android and iOS mobile browsers
- Responsive from 320px upward
