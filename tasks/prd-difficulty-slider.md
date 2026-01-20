# PRD: Difficulty Slider Filter (M3)

## 1. Introduction/Overview
The Difficulty Slider lets users adjust cocktail complexity to match their skill level or effort. This feature adds an intuitive slider labeled from **Lazy → Impress**, influencing the cocktail recommendations via a query parameter. The goal is to make results feel better tailored without increasing user effort.

## 2. Goals
- Allow users to set a **difficulty preference** using a simple slider control.
- Translate slider input into a **query parameter** for the recommendations endpoint.
- Ensure difficulty influences the **complexity** of returned cocktails (ingredients + steps).
- Provide clear, accessible labels for user understanding.

## 3. User Stories
- As a casual user, I want to pick “Lazy” so I get cocktails with fewer ingredients and steps.
- As an enthusiastic home bartender, I want to pick “Impress” so I get more complex recipes.
- As a user unsure of my preference, I want a mid-level default so I still get balanced results.

## 4. Functional Requirements
1. The system must display a **difficulty slider** labeled from **Lazy → Impress** in the existing filters panel.
2. The slider must have **3 discrete levels**: Lazy, Balanced, Impress.
3. The system must default the slider to the **mid-level (Balanced)** on first load.
4. The system must include the selected difficulty in the recommendations request as a query parameter named **`difficulty`**.
5. The system must map slider levels to a **complexity score** that uses **both ingredient count and step count**.
6. The system must send a valid difficulty value even if the user never changes the slider (default applies).
7. The system must keep the slider accessible (keyboard operable, labeled for screen readers).

## 5. Non-Goals (Out of Scope)
- No redesign of the overall filters UI beyond adding the slider.
- No new difficulty “modes” or custom user-defined difficulty values.
- No personalization or learning based on prior selections.
- No changes to cocktail data definitions beyond using existing ingredient/step counts.

## 6. Design Considerations
- Slider labels: **Lazy**, **Balanced**, **Impress**.
- Visual layout should match the current filter controls styling.
- Include a short helper line like “Difficulty affects ingredient count and steps.”
- Ensure ARIA label/role for slider and visible focus state.

## 7. Technical Considerations
- Backend query integration required (must accept `difficulty` param).
- Define a simple mapping, e.g.:
  - **Lazy** → lower complexity range
  - **Balanced** → mid complexity range
  - **Impress** → higher complexity range
- Complexity formula should combine **ingredient count + step count** (weights can be tuned later).

## 8. Success Metrics
- 80%+ of sessions that reach the filters panel successfully include a difficulty value in requests.
- Users who adjust difficulty see a measurable shift in average recipe complexity (ingredients/steps).

## 9. Open Questions
- What exact numeric ranges should represent Lazy/Balanced/Impress for complexity? Lazy <= 5/Balanced < 12/Impress >= 12
- Should the slider value be reflected in the URL for sharing or persistence? yes
- Should the UI show a short explanation tooltip or helper text? yes
