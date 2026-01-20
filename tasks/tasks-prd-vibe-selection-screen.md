## Relevant Files

- `frontend/src/components/AppLayout.tsx` - Contains the current vibe selection section and flow entry UI to adapt or extract.
- `frontend/src/components/AppLayout.test.tsx` - Existing tests for vibe selection UI states and interactions.
- `frontend/src/utils/useVibes.ts` - Hook used to fetch vibes for the UI.
- `frontend/src/utils/api.ts` - Defines `fetchVibes` and `buildCocktailsUrl` used in the flow.
- `frontend/src/data/seedData.ts` - Source of vibe definitions (Chill, Date, Party, Cozy, Fancy-but-Easy).
- `frontend/src/styles/global.css` - Styles for vibe grid, cards, and flow panel.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Review existing vibe flow UI and data sources
  - [ ] 1.1 Inspect `AppLayout` for current vibe selection and flow entry behavior.
  - [ ] 1.2 Confirm vibe data is sourced from seed data or API responses.
  - [ ] 1.3 Verify current CTA label aligns with PRD (“See drinks”).
- [ ] 2.0 Define/confirm vibe selection screen structure and state handling
  - [ ] 2.1 Document the desired selection state (single selection, required before CTA).
  - [ ] 2.2 Identify the next screen/route for the flow after selection.
  - [ ] 2.3 Ensure selection is stored in app state and passed forward.
- [ ] 3.0 Implement vibe selection UI (cards, selection state, CTA)
  - [ ] 3.1 Render vibe cards with name, description, and icon.
  - [ ] 3.2 Add selection styling and `aria-pressed` state to cards.
  - [ ] 3.3 Disable CTA until a vibe is selected; enable once selected.
  - [ ] 3.4 Update CTA label to “See drinks” per PRD.
- [ ] 4.0 Ensure accessibility and UI consistency with existing styles
  - [ ] 4.1 Validate keyboard navigation across cards and CTA.
  - [ ] 4.2 Ensure ARIA labels for vibe cards and CTA.
  - [ ] 4.3 Confirm layout responsiveness for mobile and desktop.
- [ ] 5.0 Add/adjust tests for vibe selection screen behavior
  - [ ] 5.1 Add tests for single selection and CTA enable/disable behavior.
  - [ ] 5.2 Add tests for accessible labels and selected state.
  - [ ] 5.3 Update any snapshot or UI tests impacted by label changes.
