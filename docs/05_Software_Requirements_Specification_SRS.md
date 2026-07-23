# Software Requirements Specification (SRS)

## 1. Scope
The system is a public-facing author website with editorial content, book catalog pages, sample chapter reading, blog content, comments moderation, newsletter capture, contact forms, and an interactive universe map.

## 2. System context
External systems:
- Amazon / retailer outbound book links
- Email service for newsletter delivery
- Database for content metadata, comments, and form submissions
- Analytics platform
- Optional social embeds

## 3. User classes
- Guest visitor
- Returning reader
- Commenting user
- Newsletter subscriber
- Admin / content editor

## 4. System features
### SF-1 Home page
Render hero, featured book, latest release, CTA stack, universe teaser, blog teaser.

### SF-2 Book catalog
Show all novels with metadata and filters.

### SF-3 Book detail
Show synopsis, sample chapter, buy links, reading order, and related books.

### SF-4 Universe map
Present a navigable representation of NNU / Verma Saga relationships.

### SF-5 Blog
List articles and full post pages.

### SF-6 Comments
Allow moderated comments on blog posts.

### SF-7 Newsletter
Capture subscription and send confirmation.

### SF-8 Contact
Accept reader, media, and collaboration inquiries.

### SF-9 Search
Search books, posts, characters, series, and tags.

### SF-10 Theme
Support dark mode with persisted preference.

## 5. Constraints
- No native mobile app
- No checkout system
- Must be responsive
- Must work well on low-end phones
- Must be SEO friendly
- Must support future content growth

## 6. Error handling
- No results found states
- Invalid email validation
- Network failure handling
- Comment moderation rejections
- Broken retailer link fallback
- Offline or slow-loading states

## 7. Requirement traceability
All FR and NFR items below are traced to this SRS.
