# PRD: Recipe Detail View (M4)

## 1. Introduction / Overview
The Recipe Detail View is a modal screen that lets users view a cocktail recipe’s ingredients, ratios, and preparation steps. This feature solves the problem of users not having clear, complete instructions for making a cocktail by presenting all needed info in one focused view.

## 2. Goals
- Provide a clear, scannable recipe detail view for each cocktail.
- Ensure users can understand ingredient ratios and preparation steps without leaving the screen.
- Present the recipe in a modal format that keeps the user in context.

## 3. User Stories
- As a cocktail enthusiast, I want to see ingredients and ratios so I can mix the drink correctly.
- As a casual user, I want step-by-step preparation so I can follow along easily.
- As a user browsing curated results, I want to open a recipe without losing my place.

## 4. Functional Requirements
1. The system must open a Recipe Detail View from the curated results screen.
2. The view must display the recipe name.
3. The view must list all ingredients with their ratios.
4. The view must display all preparation steps in order.
5. The view must include glassware and garnish details (if provided by the data model).
6. The view must include optional tips/notes (if provided by the data model).
7. The view must render as a card modal with a blurred background behind it.
8. The view must support closing the modal and returning to the curated results screen.

## 5. Non-Goals (Out of Scope)
- No video or media content.
- No ratings or comments.
- No saving or favoriting recipes.

## 6. Design Considerations
- The Recipe Detail View should be a centered card modal.
- The background behind the modal should be blurred for focus.
- Information hierarchy should prioritize: title → ingredients/ratios → steps → glassware/garnish → tips.
- Ensure accessibility with proper focus management and ARIA roles for the modal.

## 7. Technical Considerations
- Use the existing recipe data model (no new fields required).
- The modal should be reusable for multiple recipes.
- Ensure the modal is responsive for mobile and desktop.

## 8. Success Metrics
- Users can view ingredients, ratios, and steps without errors.

## 9. Open Questions
- What should happen if an ingredient, ratio, or preparation step is missing? don't show it
- Should glassware/garnish/tips be hidden when data is unavailable, or show a placeholder? don't show it
