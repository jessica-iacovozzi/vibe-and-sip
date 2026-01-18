## Relevant Files

- `backend/app/main.py` - Add the `GET /vibes` API route.
- `backend/app/models.py` - Vibe model used to shape the API response.
- `backend/app/seed.py` - Likely source for seeded vibe data.
- `backend/app/test_seed.py` - Existing seed validation tests that may need updates.
- `frontend/src/models/vibe.ts` - Frontend vibe type to align with API response.
- `frontend/src/data/seedData.ts` - Current vibe seed data in the frontend.
- `frontend/src/components/AppLayout.tsx` - Main UI shell where the vibe selection grid may be added.
- `frontend/src/styles/*` - Styling updates for the vibe grid, loading, and error states.
- `tasks/tasks-prd-vibe-list-retrieval.md` - Task tracking for the vibe list retrieval work.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Implement `GET /vibes` API endpoint
  - [x] 1.1 Review existing FastAPI setup and confirm where routes are registered.
  - [ ] 1.2 Add a `GET /vibes` route that returns vibe data from the database/seeded source.
  - [ ] 1.3 Ensure the response shape includes `id`, `name`, `description`, `imageUrl`, and `tags` (or mapped equivalents).
  - [ ] 1.4 Add error handling for data retrieval failures with a clear error response.
- [ ] 2.0 Wire up frontend data fetching for vibes
  - [ ] 2.1 Create a vibes fetch utility or service to call `GET /vibes`.
  - [ ] 2.2 Align the frontend `Vibe` type with the API response fields.
  - [ ] 2.3 Add loading and error state handling in the data-fetch flow.
- [ ] 3.0 Build vibe selection grid UI with loading and error states
  - [ ] 3.1 Add a vibe grid section to the main layout (or a new component) for displaying cards.
  - [ ] 3.2 Implement card markup to show vibe name and image/icon.
  - [ ] 3.3 Add accessible focus and selection styles for keyboard users.
  - [ ] 3.4 Add loading skeleton/placeholder state and an error state with retry.
- [ ] 4.0 Handle vibe selection to start drink pairing flow
  - [ ] 4.1 Track the selected vibe in local state.
  - [ ] 4.2 On selection, trigger the drink pairing flow entry point (route or UI transition).
  - [ ] 4.3 Ensure only one vibe can be selected at a time.
- [ ] 5.0 Add/adjust tests and seed data as needed
  - [ ] 5.1 Verify backend seed data includes required vibe fields for the API response.
  - [ ] 5.2 Add/update backend tests for the `GET /vibes` response shape.
  - [ ] 5.3 Add/update frontend tests for the vibe grid states (loading, error, populated).
