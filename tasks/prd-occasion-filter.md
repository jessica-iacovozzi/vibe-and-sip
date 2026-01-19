# PRD: Occasion Filter (M3)

## 1. Introduction/Overview
The Occasion Filter lets users specify an occasion that influences vibe results without blocking them. The goal is to improve result relevance and click-through while keeping exploration open.

## 2. Goals
- Increase click-through on results by ranking results based on the selected occasion.
- Provide a simple toggle-based occasion input above the results list.
- Ensure the filter never blocks results; it only influences ranking.

## 3. User Stories
- As a new visitor, I want to select an occasion so the results feel more relevant to my needs.
- As a new visitor, I want to keep seeing all results even if my occasion is uncommon.
- As a new visitor, I want quick toggle buttons so I can adjust the occasion without typing.

## 4. Functional Requirements
1. The system must display a set of occasion toggle buttons above the results list.
2. The system must use a fixed list of occasions provided by the product owner.
3. The system must allow only one occasion to be active at a time.
4. The system must include the selected occasion as a non-blocking query parameter in requests.
5. The system must rank results using the selected occasion without filtering out any results.
6. The system must keep displaying all results even when the occasion does not match any items.
7. The system must show a visual indicator of the active occasion.
8. The system must allow users to clear the occasion selection and return to default ranking.

## 5. Non-Goals (Out of Scope)
- Advanced personalization based on user history.
- Saving or persisting filter presets across sessions.

## 6. Design Considerations
- Place toggle buttons above the results list in a single horizontal row.
- Use clear on/off states with accessible contrast and focus styles.
- Provide an “All” or “No occasion” option to clear the selection.

## 7. Technical Considerations
- The occasion value should be sent as a query parameter (e.g., `?occasion=celebration`).
- Ranking logic should treat the occasion as a soft signal rather than a filter.
- Ensure query parameter values are URL-safe and use lowercase slugs.

## 8. Success Metrics
- Increase click-through rate on results compared to baseline.

## 9. Open Questions
- What is the exact fixed list of occasions to display? Solo, Couple, Hosting Friends.
- Should the default state show “All” selected or no selection? All selected is the default.
- How should the system reflect occasions that have no direct match (e.g., subtle label)? Subtle label.
