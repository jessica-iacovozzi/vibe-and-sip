## Relevant Files

- `backend/app/main.py` - Add `/cocktails` endpoint and response serialization.  
- `backend/app/models.py` - Cocktail, Vibe, Occasion, and Difficulty models used for filtering and ranking.  
- `frontend/src/utils/api.ts` - Build cocktails URL and add fetch helper for cocktails.  
- `frontend/src/utils/filterCocktails.ts` - Existing client-side filter logic; decide whether to reuse or replace with API results.  
- `frontend/src/components/AppLayout.tsx` - Current filter state and flow; connect to results list rendering.  
- `frontend/src/models/cocktail.ts` - Cocktail type used by UI.  
- `frontend/src/components/*` - New results list and empty state components (if created).  
- `frontend/src/utils/api.test.ts` - Unit tests for API helpers.  
- `backend/tests/test_cocktails.py` - API endpoint tests for `/cocktails`.  

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).  
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

### Decisions

- Allowed filter values (from seed data and config):
  - `vibe`: `vibe-chill`, `vibe-date`, `vibe-party`, `vibe-cozy`, `vibe-fancy-easy`
  - `difficulty`: `difficulty-lazy`, `difficulty-balanced`, `difficulty-impress` (default: `difficulty-balanced`)
  - `occasion`: `occasion-solo`, `occasion-couple`, `occasion-hosting-friends`
  - Missing filter = no restriction for that dimension.
- Pagination: query params `page` (1-based, default `1`) and `limit` (default `12`), response envelope `{ items, page, limit, total }`.
- Curated ranking: use database rank field on `cocktails` (ascending), tie-break by name.

## Tasks

- [x] 1.0 Define API contract and filtering rules for curated cocktail results
  - [x] 1.1 Confirm allowed values for `vibe`, `difficulty`, and `occasion` and document the defaults (missing filter = no restriction).
  - [x] 1.2 Confirm pagination shape (page/limit or cursor) and response envelope.
  - [x] 1.3 Define curated ranking source (database rank field) and ordering rules.

- [x] 2.0 Implement backend `/cocktails` endpoint with filtering and curated order
  - [x] 2.1 Add serializer for cocktail list items (name, image, short description).
  - [x] 2.2 Parse query params for vibe, difficulty, and occasion with safe defaults.
  - [x] 2.3 Build SQLAlchemy query joins for vibe/occasion/difficulty filters.
  - [x] 2.4 Apply curated rank ordering and pagination in the query.
  - [x] 2.5 Return empty array when no results, and handle errors consistently.

- [x] 3.0 Add frontend API helpers for curated cocktail results
  - [x] 3.1 Extend `api.ts` with a `fetchCocktails` helper and response typing.
  - [x] 3.2 Ensure URL building matches query param rules and pagination.
  - [x] 3.3 Add unit tests for URL builder and response handling.

- [x] 4.0 Build results list UI and empty state behavior
  - [x] 4.1 Create results list component using semantic list markup and accessible images.
  - [x] 4.2 Add empty state with “clear filters” CTA and accessible status messaging.
  - [x] 4.3 Wire selection state to render results list or empty state.

- [x] 5.0 Integrate filters with results query and pagination
  - [x] 5.1 Trigger cocktail fetch on filter changes (vibe, difficulty, occasion).
  - [x] 5.2 Sync filters to URL and keep behavior consistent with defaults.
  - [x] 5.3 Add pagination controls and loading states for results.

- [x] 6.0 Add tests for filtering, API responses, and UI states
  - [x] 6.1 Add backend tests for filter combinations and empty responses.
  - [x] 6.2 Add frontend tests for empty state, results rendering, and CTA behavior.
  - [x] 6.3 Add integration test for end-to-end filter query -> results list rendering.
