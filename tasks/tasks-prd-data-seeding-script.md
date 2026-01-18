## Relevant Files

- `frontend/src/data/seedData.ts` - Source of curated seed data to ingest into the database.
- `backend/app/health.py` - Existing database connectivity checks to mirror patterns for DB validation.
- `backend/app/main.py` - FastAPI entrypoint (potentially for wiring a seed command if exposed).
- `backend/app/seed.py` - New seed script to read seed data and insert records.
- `backend/app/seed.test.py` - Unit tests for seeding and validation logic.
- `backend/pyproject.toml` - Confirms dependencies (SQLAlchemy, Alembic) for DB access.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `seed.py` and `seed.test.py` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Review backend database access patterns
  - [ ] 1.1 Inspect current DB connectivity utilities (e.g., `health.py`) and document expected connection flow.
  - [ ] 1.2 Identify or define a minimal DB client/engine setup to reuse for seeding.
- [ ] 2.0 Map frontend seed data to backend insert shape
  - [ ] 2.1 Confirm entities and fields required from `seedData.ts` (vibes, occasions, difficulties, alcohol levels, cocktails).
  - [ ] 2.2 Define mapping rules for IDs and relationships to preserve referential integrity.
- [ ] 3.0 Implement idempotent seed script in the backend
  - [ ] 3.1 Create `backend/app/seed.py` with a CLI-friendly entry function.
  - [ ] 3.2 Insert seed entities in dependency order (vibes/occasions/difficulties/alcohol levels → cocktails).
  - [ ] 3.3 Add duplicate-safe logic (upserts or “insert if missing” checks) for re-runs.
- [ ] 4.0 Add post-seed database validation checks
  - [ ] 4.1 Query for entity counts and existence checks after insert.
  - [ ] 4.2 Validate that each vibe has exactly 3 cocktails.
  - [ ] 4.3 Emit a clear success/failure summary for the seed run.
- [ ] 5.0 Add tests for seed and validation logic
  - [ ] 5.1 Unit test seed inserts to confirm expected record counts.
  - [ ] 5.2 Unit test validation logic, including failure when a vibe has != 3 cocktails.
  - [ ] 5.3 Ensure re-running the seed does not create duplicates.
