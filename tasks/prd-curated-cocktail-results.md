# PRD: Curated Cocktail Results (M3)

## 1. Introduction/Overview
The Curated Cocktail Results feature returns a list of cocktails that match a user’s selected vibe and filters. The goal is to deliver quick, relevant recommendations and improve click-through to cocktail detail pages.

## 2. Goals
- Provide curated cocktail results that match vibe, difficulty, and occasion filters.
- Ensure users can quickly see relevant results without complex input.
- Increase click-through to cocktail detail pages from the results list.

## 3. User Stories
- As a new visitor, I want to see cocktails that match my vibe so I can pick a drink that fits my mood.
- As a returning visitor, I want filters that narrow results by difficulty and occasion so I can choose something appropriate.
- As a user, I want a clear results list so I can quickly decide which cocktail to explore.

## 4. Functional Requirements
1. The system must expose a `GET /cocktails?vibe=&difficulty=&occasion=` endpoint.
2. The system must return cocktails that match the selected vibe, difficulty, and occasion.
3. The system must treat missing filters as “no restriction” for that dimension (return all for the missing filter).
4. The system must return results ordered by curated ranking.
5. The system must return a results list containing: name, image, and short description for each cocktail.
6. The system must return an empty list when no cocktails match the selected filters.
7. The UI must show an accessible empty state with a “clear filters” call-to-action when no results are returned.
8. The UI must include accessible list markup (e.g., semantic list structure and alt text for images).

## 5. Non-Goals (Out of Scope)
- Personalized recommendations based on user history.
- Full recipe details in the results list (reserved for detail pages).
- Saving or persisting filter selections across sessions.

## 6. Design Considerations
- Results list should show a clear visual hierarchy: image, name, and short description.
- Empty state should include a concise message and a clear “clear filters” action.
- Ensure high-contrast text and visible focus styles for interactive elements.

## 7. Technical Considerations
- Query parameters should use lowercase slugs and be URL-safe.
- Curated order should be deterministic and stable across requests.
- Ensure the API returns an empty array for no matches rather than an error.

## 8. Success Metrics
- Increase click-through rate from results list to cocktail detail pages.

## 9. Open Questions
- What is the fixed list of allowed values for `vibe`, `difficulty`, and `occasion`? one for each
- How should curated order be defined and maintained (static list, database rank, or CMS field)? database rank
- Should the API include pagination for large result sets? yes
