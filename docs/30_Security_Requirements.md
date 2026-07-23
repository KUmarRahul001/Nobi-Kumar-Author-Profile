# Security Requirements

## Requirements
- HTTPS everywhere
- Secure headers
- CSRF protection for write operations
- Input sanitization
- Rate limiting
- Bot protection on forms
- Admin authentication
- Secret management via environment variables only

## Threats to mitigate
- Spam submissions
- Comment abuse
- Contact form flooding
- Script injection
- Open redirect abuse
- Unauthorized admin access

## Data handling
- Store minimal personal data
- Hash or avoid storing unnecessary email identifiers in public contexts
- Provide unsubscribe and deletion handling for newsletter data where applicable

## Content safety
- Sanitize markdown and rich text
- Block unsafe HTML
- Validate external links before publishing
