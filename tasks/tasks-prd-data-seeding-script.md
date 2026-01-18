## Relevant Files

- `frontend/src/data/seedData.ts` - Source of curated seed data to ingest into the database.
- `backend/app/health.py` - Existing database connectivity checks to mirror patterns for DB validation.
- `backend/app/main.py` - FastAPI entrypoint (potentially for wiring a seed command if exposed).
- `backend/app/db.py` - Database engine/session helpers and declarative base.
- `backend/app/models.py` - SQLAlchemy models and join tables for cocktails and related entities.
- `backend/app/seed.py` - Seed script that loads seedData.ts and inserts entities.
- `backend/app/test_seed.py` - Unit tests for seeding logic and record counts.
- `backend/alembic.ini` - Alembic configuration for migrations.
- `backend/alembic/env.py` - Alembic migration environment wired to app models.
- `backend/alembic/versions/.gitkeep` - Keeps versions directory tracked in git.
- `backend/pyproject.toml` - Confirms dependencies (SQLAlchemy, Alembic) for DB access.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `seed.py` and `test_seed.py` in the same directory).
- Use `poetry run pytest [optional/path/to/test_file]` to run tests. Running without a path executes all tests found by the pytest configuration.

## Tasks

- [x] 1.0 Review backend database access patterns
  - [x] 1.1 Inspect current DB connectivity utilities (e.g., `health.py`) and document expected connection flow.
  - [x] 1.2 Identify or define a minimal DB client/engine setup to reuse for seeding.
- [x] 2.0 Map frontend seed data to backend insert shape
  - [x] 2.1 Confirm entities and fields required from `seedData.ts` (vibes, occasions, difficulties, alcohol levels, cocktails).
  - [x] 2.2 Define mapping rules for IDs and relationships to preserve referential integrity.
- [x] 3.0 Define database schema and relationships
  - [x] 3.1 Create SQLAlchemy models for vibes, occasions, difficulties, alcohol levels, cocktails, and join tables.
  - [x] 3.2 Configure Alembic migrations to create the schema in the database.
  - [x] 3.3 Validate that relationship constraints match seed data needs (many-to-many for vibes/occasions).
- [x] 4.0 Implement idempotent seed script in the backend
  - [x] 4.1 Create `backend/app/seed.py` with a CLI-friendly entry function.
  - [x] 4.2 Insert seed entities in dependency order (vibes/occasions/difficulties/alcohol levels → cocktails).
  - [x] 4.3 Add duplicate-safe logic (upserts or “insert if missing” checks) for re-runs.
- [x] 5.0 Add post-seed database validation checks
  - [x] 5.1 Query for entity counts and existence checks after insert.
  - [x] 5.2 Emit a clear success/failure summary for the seed run.
- [x] 6.0 Add tests for seed and validation logic
  - [x] 6.1 Unit test seed inserts to confirm expected record counts.
  - [x] 6.2 Unit test validation logic.
  - [x] 6.3 Ensure re-running the seed does not create duplicates.
