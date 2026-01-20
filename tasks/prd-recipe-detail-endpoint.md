# PRD: Recipe Detail Endpoint (M3)

## 1. Introduction/Overview
The Recipe Detail Endpoint provides full recipe data for a selected cocktail so users can view complete ingredients and instructions after choosing a drink. The goal is to support a dedicated recipe detail view with all required information in a single request.

## 2. Goals
- Return full recipe details for a single cocktail by ID.
- Power the recipe detail view with complete data in one API call.
- Improve the user’s ability to evaluate and make a cocktail from the app.

## 3. User Stories
- As a user browsing cocktails, I want to open a recipe detail page so I can see all ingredients and steps.
- As a user, I want a single detail view that shows everything I need to make the drink.
- As a user, I want clear, accurate measurements and instructions so I can follow the recipe without guessing.

## 4. Functional Requirements
1. The system must expose a `GET /cocktails/{id}` endpoint.
2. The system must return a 404 error with a clear message when the cocktail ID does not exist.
3. The system must return the cocktail name and description.
4. The system must return an image URL for the cocktail.
5. The system must return a list of ingredients with quantities (e.g., amount and unit).
6. The system must return step-by-step instructions in order.
7. The system must return glassware and garnish details.
8. The system must return tags for spirit, flavor, and difficulty.
9. The endpoint must be publicly accessible without authentication.

## 5. Non-Goals (Out of Scope)
- Editing or updating recipes.
- Ratings, reviews, or social feedback on recipes.

## 6. Design Considerations
- The recipe detail view should use clear hierarchy: name, image, key details, then ingredients and steps.
- Ensure accessible markup for lists (ingredients, steps) and alt text for images.

## 7. Technical Considerations
- Keep the response payload stable and well-documented to support the frontend detail view.
- Use consistent ingredient formatting (amount + unit + ingredient name).
- Ensure the error payload for 404 is predictable and readable.

## 8. Success Metrics
- Recipe detail view renders all required fields without additional API calls.
- Endpoint has passing unit tests for success and 404 cases.

## 9. Open Questions
- Should tags be returned as a flat list or grouped by type (spirit, flavor, difficulty)? grouped by type.
- Should instructions be returned as a single string or an ordered array of steps? ordered array of steps.
