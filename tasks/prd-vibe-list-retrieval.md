# PRD: Vibe List Retrieval

## 1. Introduction / Overview
The Vibe List Retrieval feature enables all users to view and select from a curated list of vibes. The goal is to help users quickly choose a vibe to personalize their session and immediately start the next flow (e.g., drink pairing, playlist). This feature focuses on fetching available vibes through `GET /vibes` and presenting them in a vibe card grid.

## 2. Goals
- Provide a reliable `GET /vibes` endpoint that returns full vibe card data.
- Display a clear, tappable grid of vibe cards for selection.
- Enable users to start the next flow immediately after selecting a vibe.
- Reduce friction to the first vibe selection for all users.

## 3. User Stories
- As a user, I want to see a list of vibes so I can quickly pick one that matches my mood.
- As a user, I want to see a visual vibe grid so I can scan options quickly.
- As a user, I want selecting a vibe to take me into the next flow so I can continue my session without extra steps.

## 4. Functional Requirements
1. The system must expose `GET /vibes` to fetch available vibes.
2. The `GET /vibes` response must include full vibe card data: `id`, `name`, `description`, `imageUrl`, and `tags`.
3. The UI must render a vibe card grid using the data from `GET /vibes`.
4. Each vibe card must display the vibe name and image.
5. The system must allow a user to select a single vibe card.
6. Selecting a vibe must start the next flow (e.g., drink pairing or playlist).
7. On request failure, the UI must show an error state with a retry button.
8. The system must log or surface user-visible errors for failed vibe retrievals.

## 5. Non-Goals (Out of Scope)
- Creating or editing vibes.
- Personalization or recommendation logic.
- Analytics tracking for vibe selection.

## 6. Design Considerations
- Use a clean, tappable card grid layout with clear spacing for scanability.
- Provide an obvious loading state while vibes are being retrieved.
- Ensure cards are accessible (keyboard focus, ARIA labels on selectable cards).

## 7. Technical Considerations
- `GET /vibes` should return a stable, predictable schema for the frontend.
- The endpoint should be performant enough to avoid noticeable loading delays.
- If the backend already has a Vibe model, reuse it to build the response.

## 8. Success Metrics
- Increase the percentage of users who select a vibe.

## 9. Open Questions
- What is the exact “next flow” destination after selection (drink pairing, playlist, or configurable)? Drink pairing for now.
- Do we need pagination or filtering now, or can this remain a full list for M3? No pagination or filtering for now.
