# CI/CD Plan

## Pipeline stages
- install
- typecheck
- lint
- unit tests
- integration tests
- build
- accessibility checks
- preview deploy
- production deploy

## Quality gates
- No failed tests
- No type errors
- No lint violations
- No critical accessibility failures
- No unresolved security scans

## Branch strategy
- main for production
- feature branches for work
- preview deployments per branch

## Automation notes
- Public preview links should be generated for review
- Build failures must surface actionable logs
