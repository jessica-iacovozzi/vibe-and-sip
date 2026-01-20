## Relevant Files

- `backend/app/main.py` - FastAPI routes and serialization helpers; likely location for the new `GET /cocktails/{id}` endpoint.
- `backend/app/models.py` - Cocktail model includes ingredients and steps; may need additional fields for glassware, garnish, image, and tags.
- `backend/tests/test_cocktails.py` - Existing cocktails endpoint tests; add tests for recipe detail success and 404 cases.
- `backend/app/db.py` - Database session helper used by endpoints; referenced for consistency.
- `backend/app/seed.py` - Seeds cocktail detail fields for the recipe detail response.
- `frontend/src/models/cocktail.ts` - Frontend cocktail model used by seed data and utilities.
- `frontend/src/data/seedData.ts` - Seed data updated with structured ingredients and recipe detail fields.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `main.py` and `test_cocktails.py` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Review current cocktail data model and confirm required fields for recipe detail response
  - [x] 1.1 Inspect `Cocktail` model fields (ingredients, steps) and identify missing fields (glassware, garnish, image, tags).
  - [x] 1.2 Decide how tags should be grouped (spirit, flavor, difficulty) in the response payload.
  - [x] 1.3 Verify if ingredient quantities are stored or need a new structure for amount + unit + name.
  - [x] 1.4 Note any needed schema changes or serializer-only mappings.

- [x] 2.0 Implement `GET /cocktails/{id}` endpoint with full recipe serialization
  - [x] 2.1 Add a serializer for recipe detail payload in `backend/app/main.py`.
  - [x] 2.2 Query the database for a cocktail by ID with required relationships.
  - [x] 2.3 Return name, description, image URL, ingredients, steps, glassware, garnish, and grouped tags.
  - [x] 2.4 Update the `Cocktail` model and seed data to include image URL, glassware, garnish, tags, and structured ingredients.

- [x] 3.0 Add error handling for missing cocktail IDs (404) and validate response shape
  - [x] 3.1 Raise a 404 with a clear message when no cocktail is found for the ID.
  - [x] 3.2 Confirm response uses ordered steps array and predictable tag grouping.

- [x] 4.0 Create/update unit tests for recipe detail success and 404 cases
  - [x] 4.1 Add a test fixture that seeds a cocktail with full recipe detail data.
  - [x] 4.2 Add a success test verifying all required fields and tag grouping.
  - [x] 4.3 Add a 404 test verifying status code and error payload.

- [x] 5.0 Document payload expectations and ensure consistency with frontend detail view needs
  - [x] 5.1 Document the expected JSON shape in task notes or inline comments near the endpoint.
  - [x] 5.2 Cross-check fields against the detail view requirements for completeness.
