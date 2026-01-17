## Relevant Files

- `frontend/src/models/cocktail.ts` - Define `Cocktail` model shape and related types.
- `frontend/src/models/vibe.ts` - Define `Vibe` model shape.
- `frontend/src/models/occasion.ts` - Define `Occasion` model shape.
- `frontend/src/models/difficulty.ts` - Define `Difficulty` model shape.
- `frontend/src/models/alcoholLevel.ts` - Define `AlcoholLevel` model shape.
- `frontend/src/models/filterTypes.ts` - Shared filter input types for multi/single select fields.
- `frontend/src/models/index.ts` - Barrel exports for model types and filter inputs.
- `frontend/src/data/seedData.ts` - Seed data for all domain models.
- `frontend/src/utils/filterCocktails.ts` - Pure filtering helpers for basic filters.
- `frontend/src/utils/filterCocktails.test.ts` - Unit tests for filtering helpers.
- `frontend/src/models/models.test.ts` - Unit tests for model shape consistency.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Define domain model types for cocktails and filters
  - [x] 1.1 Create model folders/files for `Cocktail`, `Vibe`, `Occasion`, `Difficulty`, and `AlcoholLevel`
  - [x] 1.2 Define TypeScript types/interfaces with required fields and optional fields
  - [x] 1.3 Add shared types/enums for filter inputs (multi-select vibes/occasions, single difficulty/alcohol)
  - [x] 1.4 Export model types from a single index barrel
- [ ] 2.0 Create seed data for vibes, occasions, difficulty, alcohol levels, and cocktails
  - [ ] 2.1 Define seed lists for `Vibe`, `Occasion`, `Difficulty`, and `AlcoholLevel` with stable IDs
  - [ ] 2.2 Create a small `Cocktail` seed set with correct foreign keys (difficulty/alcohol) and arrays (vibes/occasions)
  - [ ] 2.3 Validate that IDs referenced in cocktails exist in the seed lists
  - [ ] 2.4 Export seed data from a single index barrel
- [ ] 3.0 Implement pure filtering utilities for basic filter combinations
  - [ ] 3.1 Define a `FilterCriteria` type with optional difficulty/alcohol and multi-select arrays
  - [ ] 3.2 Implement `filterCocktails` as a pure function using early returns and array helpers
  - [ ] 3.3 Ensure filtering supports single difficulty/alcohol and multi-select vibes/occasions
  - [ ] 3.4 Add a small helper to normalize empty/undefined filter inputs
- [ ] 4.0 Add unit tests for model shapes and filtering behavior
  - [ ] 4.1 Add tests that validate each model has required fields
  - [ ] 4.2 Add tests for filtering by difficulty only, alcohol only, vibes only, occasions only
  - [ ] 4.3 Add tests for combined filters (vibes + occasions + difficulty + alcohol)
  - [ ] 4.4 Add tests for empty filters returning all cocktails
- [ ] 5.0 Add a single export surface for models, seed data, and filtering helpers
  - [ ] 5.1 Create `frontend/src/domain/index.ts` (or similar) to export models, data, and utilities
  - [ ] 5.2 Update imports in tests to use the new export surface
