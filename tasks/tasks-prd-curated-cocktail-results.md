## Relevant Files

- `backend/app/main.py` - Add `/cocktails` endpoint and response serialization.  
- `backend/app/models.py` - Cocktail, Vibe, Occasion, and Difficulty models used for filtering and ranking.  
- `frontend/src/utils/api.ts` - Build cocktails URL and add fetch helper for cocktails.  
- `frontend/src/utils/filterCocktails.ts` - Existing client-side filter logic; decide whether to reuse or replace with API results.  
- `frontend/src/components/AppLayout.tsx` - Current filter state and flow; connect to results list rendering.  
- `frontend/src/models/cocktail.ts` - Cocktail type used by UI.  
- `frontend/src/components/*` - New results list and empty state components (if created).  
- `frontend/src/utils/api.test.ts` - Unit tests for API helpers (if present or to be added).  
- `backend/tests/test_cocktails.py` - API endpoint tests for `/cocktails` (to be added).  

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).  
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Define API contract and filtering rules for curated cocktail results
  - [ ] 1.1 Confirm allowed values for `vibe`, `difficulty`, and `occasion` and document the defaults (missing filter = no restriction).
  - [ ] 1.2 Confirm pagination shape (page/limit or cursor) and response envelope.
  - [ ] 1.3 Define curated ranking source (database rank field) and ordering rules.

- [ ] 2.0 Implement backend `/cocktails` endpoint with filtering and curated order
  - [ ] 2.1 Add serializer for cocktail list items (name, image, short description).
  - [ ] 2.2 Parse query params for vibe, difficulty, and occasion with safe defaults.
  - [ ] 2.3 Build SQLAlchemy query joins for vibe/occasion/difficulty filters.
  - [ ] 2.4 Apply curated rank ordering and pagination in the query.
  - [ ] 2.5 Return empty array when no results, and handle errors consistently.

- [ ] 3.0 Add frontend API helpers for curated cocktail results
  - [ ] 3.1 Extend `api.ts` with a `fetchCocktails` helper and response typing.
  - [ ] 3.2 Ensure URL building matches query param rules and pagination.
  - [ ] 3.3 Add unit tests for URL builder and response handling.

- [ ] 4.0 Build results list UI and empty state behavior
  - [ ] 4.1 Create results list component using semantic list markup and accessible images.
  - [ ] 4.2 Add empty state with “clear filters” CTA and accessible status messaging.
  - [ ] 4.3 Wire selection state to render results list or empty state.

- [ ] 5.0 Integrate filters with results query and pagination
  - [ ] 5.1 Trigger cocktail fetch on filter changes (vibe, difficulty, occasion).
  - [ ] 5.2 Sync filters to URL and keep behavior consistent with defaults.
  - [ ] 5.3 Add pagination controls and loading states for results.

- [ ] 6.0 Add tests for filtering, API responses, and UI states
  - [ ] 6.1 Add backend tests for filter combinations and empty responses.
  - [ ] 6.2 Add frontend tests for empty state, results rendering, and CTA behavior.
  - [ ] 6.3 Add integration test for end-to-end filter query -> results list rendering.
