# PRD: Vibe Selection Screen

## 1. Introduction/Overview
The Vibe Selection Screen is the first step in the UI flow for Vibe & Sip. It allows users to start the cocktail flow by choosing a single vibe (e.g., Chill, Date, Party). This solves the problem of getting users into the experience quickly with a clear, mood-based entry point.

## 2. Goals
- Enable users to select one vibe and begin the flow in under 10 seconds.
- Make the starting point feel intentional and aligned to a user’s mood.
- Maintain consistency with existing app styles.

## 3. User Stories
- As a user, I want to pick a vibe quickly so I can start getting cocktail ideas without extra steps.
- As a user, I want short descriptions and icons so I can choose the right vibe with confidence.
- As a returning user, I want a familiar first step that matches the rest of the app.

## 4. Functional Requirements
1. The system must display a list of available vibes: Chill, Date, Party, Cozy, Fancy-but-Easy.
2. The system must show each vibe with a name, short description, and icon.
3. The system must allow users to select exactly one vibe at a time.
4. The system must provide a primary “Continue” action that is enabled only after a vibe is selected.
5. The system must proceed to the next step in the flow using the selected vibe.
6. The system must visually indicate the currently selected vibe.
7. The system must follow existing app styling and UI patterns.
8. The system must be accessible with keyboard navigation and screen readers (ARIA labels on vibe cards and the Continue button).

## 5. Non-Goals (Out of Scope)
- No personalization or recommendation logic.
- No login or signup prompts.
- No analytics or tracking events.

## 6. Design Considerations
- Use the existing app’s typography, spacing, and button styles.
- Each vibe card should include a recognizable icon plus a 1 sentence description.
- Ensure the layout works on mobile and desktop.

## 7. Technical Considerations
- Vibe definitions should come from existing data models where available (e.g., seed data).
- The selection should be stored in app state and passed to the next step.

## 8. Success Metrics
- 80%+ of users who land on the screen select a vibe and continue.

## 9. Open Questions
- What is the exact next screen after vibe selection? List of cocktails.
- Should the Continue button label be “Continue” or “See Drinks”? See drinks.
- Are there any constraints on icon sources or formats? Use Lucide library.
