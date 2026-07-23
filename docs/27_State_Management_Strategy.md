# State Management Strategy

## Guiding principle
Use the lightest state tool that satisfies the need.

## State categories
### Local UI state
- theme toggle
- open/close modals
- active tabs
- mobile nav

### Shared client state
- search query
- selected universe node
- form state
- comment composer state

### Server state
- books
- posts
- universe graph
- comments
- newsletter status

## Recommended approach
- Server components for content rendering
- React state for local interaction
- URL state for search and filters
- Optional lightweight store only if needed for map interactions

## Search state
- Query in URL
- Debounced search input
- Result grouping by type

## Theme state
- Persisted across sessions
- Default to dark
