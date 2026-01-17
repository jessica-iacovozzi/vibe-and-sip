# PRD: Domain Models for Filtering

## 1. Introduction/Overview
This milestone defines the core domain entities required to support cocktail filtering in the Vibe & Sip frontend. The goal is to create consistent, typed models that the frontend can rely on for filtering and display, with seed data and basic query/filter behavior verified by tests.

## 2. Goals
- Establish clear, reusable domain models for Cocktail, Vibe, Occasion, Difficulty, and AlcoholLevel.
- Enable basic filtering of cocktails by vibe(s), occasion(s), difficulty, and alcohol level.
- Provide seed data that front-end developers can use immediately.
- Deliver tests that validate model structure and filtering behavior.

## 3. User Stories
- As a frontend developer, I want consistent model shapes so I can render filters and cocktail cards without guessing fields.
- As a frontend developer, I want to filter cocktails by vibe and occasion so I can match the user’s selections.
- As a frontend developer, I want a single difficulty and alcohol level per cocktail to simplify UI logic.

## 4. Functional Requirements
1. The system must define a **Cocktail** model with at least:
   - `id` (string)
   - `name` (string)
   - `description` (string)
   - `ingredients` (string[])
   - `steps` (string[])
   - `imageUrl` (string, optional)
   - `difficultyId` (string)
   - `alcoholLevelId` (string)
   - `vibeIds` (string[])
   - `occasionIds` (string[])
2. The system must define a **Vibe** model with at least:
   - `id` (string)
   - `name` (string)
   - `description` (string)
   - `icon` (string, optional)
3. The system must define an **Occasion** model with at least:
   - `id` (string)
   - `name` (string)
   - `description` (string)
4. The system must define a **Difficulty** model with at least:
   - `id` (string)
   - `label` (string)
   - `rank` (number, for ordering)
5. The system must define an **AlcoholLevel** model with at least:
   - `id` (string)
   - `label` (string)
   - `rank` (number, for ordering)
6. The system must support basic filtering of cocktails by:
   - one difficulty
   - one alcohol level
   - one or more vibes
   - one or more occasions
7. The system must provide seed data for all models (static data and/or admin-provided data).
8. The system must include tests that validate:
   - model shape consistency
   - filtering behavior for each filter type

## 5. Non-Goals (Out of Scope)
- Admin tools or admin UI for managing data.
- Persistence beyond seed data (no database requirements in this milestone).
- Advanced search, ranking, i18n localization, or personalization.

## 6. Design Considerations
- Keep model fields minimal and consistent to support fast UI iteration.
- IDs should be stable and human-readable (e.g., `vibe-chill`, `difficulty-moderate`).

## 7. Technical Considerations
- Seed data should be structured for easy import by frontend modules.
- Filtering helpers should be pure functions to simplify unit testing.
- Avoid tightly coupling to UI components; models should be UI-agnostic.

## 8. Success Metrics
- Domain models exist with clear fields and seed data.
- Filtering logic works for single and multi-select filters.
- Tests pass for model shape and filtering behavior.
