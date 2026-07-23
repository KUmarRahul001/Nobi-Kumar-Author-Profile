# Routing Architecture

## Public routes
- `/` home
- `/books`
- `/books/[slug]`
- `/books/[slug]/sample`
- `/universe`
- `/universe/[node]`
- `/blog`
- `/blog/[slug]`
- `/about`
- `/contact`
- `/search`
- `/faq`
- `/newsletter`
- `/privacy`
- `/terms`
- `/accessibility`

## API routes
- `/api/newsletter`
- `/api/contact`
- `/api/comments`
- `/api/search`
- `/api/analytics`

## Route design rules
- Slugs must be stable and human readable
- Book sample pages should be nested under the book route
- Blog comments should never break static page rendering
- Search should not require page reloads
- Canonical redirects should be enforced

## URL conventions
- lowercase
- hyphen-separated
- no dates in public book URLs unless needed for a blog archive
