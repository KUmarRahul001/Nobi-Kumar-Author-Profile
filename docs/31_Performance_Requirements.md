# Performance Requirements

## Targets
- Fast initial render on mobile
- Efficient image loading
- Minimal client JavaScript
- Smooth interactive map behavior
- Fast search response

## Optimization methods
- Static generation for most public pages
- Image optimization and responsive sizes
- Route-level code splitting
- Lazy load non-critical modules
- Cache content aggressively
- Defer comments until needed

## Media strategy
- Use next-gen image formats where possible
- Pre-generate OG images
- Compress cover art without losing legibility

## Performance edge cases
- Large universe map should not block page load
- Blog comments should not delay article rendering
- Search should remain useful with limited network speed
