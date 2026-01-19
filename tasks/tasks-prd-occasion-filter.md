## Relevant Files

- `frontend/src/components/AppLayout.tsx` - Main layout where the vibe section lives; likely host the new occasion toggle UI and selection state.
- `frontend/src/components/AppLayout.test.tsx` - UI tests to extend for the occasion toggle behavior and a11y states.
- `frontend/src/utils/api.ts` - Fetch helper for vibes; update to include optional `occasion` query param.
- `frontend/src/utils/useVibes.ts` - Hook that calls `fetchVibes`; extend to accept occasion input.
- `frontend/src/utils/filterCocktails.ts` - Current filter logic; may need soft-ranking helper (or new utility) to rank by occasion without filtering.
- `frontend/src/models/filterTypes.ts` - Shared filter types; may need to model a single occasion selection or query input.
- `frontend/src/data/seedData.ts` - Seeded occasion IDs used for ranking and UI labels.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Define occasion filter data model and defaults
  - [ ] 1.1 Confirm the fixed occasion list and map display labels to occasion IDs (Solo, Couple, Hosting Friends).
  - [ ] 1.2 Add a default “All” state and ensure it maps to an empty selection in the model.
  - [ ] 1.3 Update or extend filter types to include the single occasion selection used by the UI and query param.

- [ ] 2.0 Build Occasion toggle UI above results and wire selection state
  - [ ] 2.1 Add an Occasion toggle group above the results list with accessible button semantics (`aria-pressed`).
  - [ ] 2.2 Implement selection state with single-active behavior and a clear “All” option.
  - [ ] 2.3 Show a subtle label when no direct match is detected, without hiding results.

- [ ] 3.0 Send non-blocking `occasion` query param in vibe/cocktail fetch flow
  - [ ] 3.1 Extend `fetchVibes` to accept an optional `occasion` param and build a URL-safe query string.
  - [ ] 3.2 Update `useVibes` to pass the selected occasion when loading or reloading.
  - [ ] 3.3 Ensure the param is omitted for the “All” state to avoid backend filtering assumptions.

- [ ] 4.0 Implement soft-ranking logic for occasion without filtering results
  - [ ] 4.1 Add a ranking helper that boosts items matching the selected occasion while preserving all results.
  - [ ] 4.2 Apply the ranking to the results list where cocktails/vibes are displayed.
  - [ ] 4.3 Keep existing filter logic intact; do not exclude items based on occasion.

- [ ] 5.0 Add tests and a11y checks for the occasion flow
  - [ ] 5.1 Add UI tests for toggle behavior, “All” reset, and active state.
  - [ ] 5.2 Add unit tests for the ranking helper (matching vs. non-matching order).
  - [ ] 5.3 Verify a11y attributes and keyboard focus styles for toggle buttons.
