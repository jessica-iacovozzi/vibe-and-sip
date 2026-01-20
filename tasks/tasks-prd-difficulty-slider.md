## Relevant Files

- `frontend/src/components/AppLayout.tsx` - Hosts the filters panel and UI flow where the difficulty slider will live.
- `frontend/src/components/AppLayout.test.tsx` - UI tests for filters panel interactions and a11y checks.
- `frontend/src/utils/api.ts` - Builds query params for API requests; needs difficulty param support.
- `frontend/src/utils/filterCocktails.ts` - Local filtering logic for difficulty/complexity matching.
- `frontend/src/utils/filterCocktails.test.ts` - Unit tests for difficulty-based filtering.
- `frontend/src/data/seedData.ts` - Difficulty definitions used to render slider labels/values.
- `frontend/src/models/filterTypes.ts` - Filter input shape includes difficulty fields.
- `frontend/src/styles/global.css` - Styles for slider and labels in the filters panel.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `AppLayout.tsx` and `AppLayout.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Define difficulty levels, mapping, and query parameter handling
  - [ ] 1.1 Confirm slider values and labels: Lazy, Balanced, Impress (3 discrete steps).
  - [ ] 1.2 Define the complexity score formula using ingredient count + step count (document the weights).
  - [ ] 1.3 Specify numeric ranges: Lazy <= 5, Balanced < 12, Impress >= 12.
  - [ ] 1.4 Document query param contract: `difficulty` included in request URL.
  - [ ] 1.5 Decide URL persistence behavior (reflect in query string on change).

- [ ] 2.0 Add difficulty filter state and integrate with recommendations request flow
  - [ ] 2.1 Add difficulty state to the filters panel with default set to Balanced.
  - [ ] 2.2 Update request-building logic to include `difficulty` param.
  - [ ] 2.3 Ensure the default difficulty is sent even if the slider is untouched.
  - [ ] 2.4 Add helper text/tooltip copy to describe complexity impact.

- [ ] 3.0 Build the Difficulty Slider UI in the filters panel with a11y support
  - [ ] 3.1 Add slider component UI to the filters panel layout.
  - [ ] 3.2 Render labels for Lazy/Balanced/Impress and highlight the active value.
  - [ ] 3.3 Add ARIA labeling and keyboard support for the slider.
  - [ ] 3.4 Style the slider and labels to match the existing filter controls.

- [ ] 4.0 Update data/logic to reflect complexity (ingredients + steps) and slider defaults
  - [ ] 4.1 Align difficulty seed data labels to Lazy/Balanced/Impress.
  - [ ] 4.2 Update filter logic to map slider value to the proper difficulty id.
  - [ ] 4.3 Ensure cocktail filtering respects the mapped difficulty range.
  - [ ] 4.4 Add utility for computing complexity score from ingredients + steps.

- [ ] 5.0 Add/update tests for difficulty filtering and query param behavior
  - [ ] 5.1 Unit test complexity score calculation and range mapping.
  - [ ] 5.2 Unit test `filterCocktails` with each difficulty level.
  - [ ] 5.3 UI test: default difficulty is Balanced and included in request.
  - [ ] 5.4 UI test: slider interaction updates query param and label state.
