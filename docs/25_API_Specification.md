# API Specification

## Principles
- JSON over HTTPS
- Validate all inputs
- Return consistent errors
- Keep public APIs small

## Endpoints

### POST /api/newsletter
Request:
```json
{ "email": "reader@example.com", "consent": true, "source": "footer_form" }
```
Responses:
- 201 created
- 400 invalid email or missing consent
- 409 already subscribed

### POST /api/contact
Request:
```json
{ "name": "Rahul", "email": "reader@example.com", "category": "media", "subject": "Interview", "message": "..." }
```

### POST /api/comments
Request:
```json
{ "postId": "slug", "name": "Reader", "email": "reader@example.com", "body": "..." }
```
Response should create a pending comment.

### GET /api/search?q=
Returns grouped results for books, posts, and universe nodes.

### POST /api/analytics
Used for CTA clicks, sample opens, search usage, and form submits.

## Error format
```json
{ "error": { "code": "INVALID_INPUT", "message": "Email is invalid" } }
```

## Security
- Rate limit write endpoints
- Anti-spam validation
- CORS locked to site origin
- No secrets in client requests
