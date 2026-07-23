# Database Design

## Why a database is required
The site needs persistence for comments, newsletter subscriptions, contact requests, moderation, and future reader interactions.

## Proposed database
PostgreSQL via Supabase or equivalent managed provider.

## Core tables
### authors
- id
- display_name
- bio
- tagline
- social_links
- created_at
- updated_at

### books
- id
- slug
- title
- series_name
- volume_number
- status
- synopsis
- sample_path
- buy_links
- publication_date
- featured
- created_at
- updated_at

### posts
- id
- slug
- title
- excerpt
- body
- category
- tags
- published_at
- status

### comments
- id
- post_id
- name
- email_hash
- body
- status
- moderation_reason
- created_at

### newsletter_subscribers
- id
- email
- consent
- source
- status
- subscribed_at
- unsubscribed_at

### contact_messages
- id
- category
- name
- email
- subject
- message
- status
- created_at

### universe_nodes
- id
- slug
- label
- type
- summary
- book_id
- metadata_json

### universe_edges
- id
- source_node_id
- target_node_id
- relation_type

### analytics_events
- id
- event_name
- entity_type
- entity_id
- metadata_json
- created_at

## Indexing strategy
- books.slug unique
- posts.slug unique
- comments.post_id index
- newsletter_subscribers.email unique
- universe edges indexed by source and target

## Data retention
- contact messages retained for operations
- analytics retained per policy
- unsubscribed emails preserved as suppression records
