# PRD: Data Seeding Script

## 1. Introduction/Overview
This milestone delivers a backend data seeding script that populates the actual database with the curated cocktail catalog defined in the frontend seed data. The goal is to create a reliable, repeatable seed process so the application has a consistent baseline dataset for development and testing, while leaving room for future user-generated cocktails.

## 2. Goals
- Seed the database with the curated cocktail catalog from `frontend/src/data/seedData.ts`.
- Ensure each vibe ends up with exactly 3 cocktails in the database (as already curated in seed data).
- Provide clear validation via database checks after seeding.
- Keep the solution extensible for future user-added cocktails.

## 3. User Stories
- As a developer, I want a repeatable seed script so I can set up the database quickly for local development.
- As a developer, I want confirmation that seed data was inserted correctly so I can trust the dataset.
- As a QA tester, I want the same baseline cocktail catalog each time I reset the database.

## 4. Functional Requirements
1. The system must read the curated seed data from `frontend/src/data/seedData.ts` as the source of truth.
2. The system must insert all seed entities into the database:
   - Vibes
   - Occasions
   - Difficulties
   - Alcohol levels
   - Cocktails
3. The system must maintain referential integrity between cocktails and their related entities (vibe IDs, occasion IDs, difficulty ID, alcohol level ID).
4. The system must prevent duplicate entries when the seed script is run multiple times (idempotent behavior or safe re-run strategy).
5. The system must perform database checks after seeding to verify:
   - All seed entities exist.
   - Each vibe has exactly 3 cocktails in the database.
6. The system must output a clear success or failure message based on the database checks.

## 5. Non-Goals (Out of Scope)
- No UI changes.
- No admin interface for managing cocktails.
- No user-generated cocktail creation flow in this milestone.
- No additional datasets beyond the curated seed data.

## 6. Design Considerations
- None for this milestone (script-only backend task).

## 7. Technical Considerations
- The seed script should live in the backend and be runnable via a command or task runner.
- Use existing backend database access patterns and models.
- Seed order should respect dependencies (e.g., create vibes before cocktails).
- Validation should be based on database queries, not just in-memory checks.

## 8. Success Metrics
- Seed script runs successfully in a clean database and produces the expected dataset.
- Database checks confirm:
  - All seed entities exist.
  - Every vibe has exactly 3 cocktails.
- Repeat runs do not create duplicate records.
