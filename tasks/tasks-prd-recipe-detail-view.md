## Relevant Files

- `frontend/src/components/AppLayout.tsx` - Curated results list and state management for results view; needs modal trigger wiring. 
- `frontend/src/components/RecipeDetailModal.tsx` - New modal component for recipe details (card modal + a11y behavior).
- `frontend/src/styles/global.css` - Global styles; add modal/backdrop styles and responsive layout rules.
- `frontend/src/utils/api.ts` - Recipe list types; may extend or reuse for detail data typing.
- `frontend/src/data/seedData.ts` - Existing recipe data (ingredients, steps, glassware, garnish, tags).
- `frontend/src/components/RecipeDetailModal.test.tsx` - Unit tests for modal rendering and behaviors.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Add recipe selection + modal trigger from curated results list
  - [ ] 1.1 Add state in `AppLayout` to track selected recipe and modal open/close.
  - [ ] 1.2 Make each result card actionable (button or click handler) and open the modal with the selected recipe.
  - [ ] 1.3 Ensure the trigger preserves current pagination and does not reset results.
- [ ] 2.0 Build Recipe Detail Modal component (card layout + blurred backdrop)
  - [ ] 2.1 Create `RecipeDetailModal` component with semantic structure and ARIA role="dialog".
  - [ ] 2.2 Add backdrop overlay with blur + click-to-close behavior.
  - [ ] 2.3 Include close button with accessible label and focus-visible styles.
- [ ] 3.0 Wire recipe data into modal (ingredients/ratios, steps, glassware, garnish, tips)
  - [ ] 3.1 Define prop types for recipe details using existing data model.
  - [ ] 3.2 Render ingredients with ratios and units, hiding missing values.
  - [ ] 3.3 Render ordered steps.
  - [ ] 3.4 Conditionally render glassware, garnish, and tips when available.
- [ ] 4.0 Add modal UX behaviors (open/close, focus management, accessibility)
  - [ ] 4.1 Trap focus within the modal while open.
  - [ ] 4.2 Return focus to the triggering result card on close.
  - [ ] 4.3 Support ESC key to close and set `aria-labelledby`/`aria-describedby`.
- [ ] 5.0 Style modal and responsive layout to match existing design system
  - [ ] 5.1 Add modal card styles (spacing, typography, section headings).
  - [ ] 5.2 Add responsive rules for mobile (stacked layout, full-width modal).
  - [ ] 5.3 Add backdrop blur and elevation consistent with existing shadows.
- [ ] 6.0 Add tests for modal rendering and behaviors
  - [ ] 6.1 Test rendering of ingredients, steps, and optional fields when present.
  - [ ] 6.2 Test missing data handling (fields hidden).
  - [ ] 6.3 Test open/close behavior and ESC key dismissal.
