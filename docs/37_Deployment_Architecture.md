# Deployment Architecture

## Recommended deployment model
- Frontend on a modern hosting platform
- Database on managed Postgres
- Media on CDN/object storage
- Email/newsletter provider external
- Analytics external

## Environments
- local
- preview
- staging
- production

## Release flow
1. Commit changes
2. Run lint/tests/build
3. Deploy preview
4. Validate pages and forms
5. Promote to production

## Operational safeguards
- Preview deployments for every change
- Environment-specific secrets
- Rollback capability
- Health checks and logging
