# Development Roadmap

# Vibe & Sip — Combined Feature & Milestone Plan

This document presents a unified, logic-driven breakdown of features, backend/frontend responsibilities, and delivery milestones.  
Each row represents a standalone, independently buildable unit, sequenced from foundation to polish.

---

## Combined Feature & Milestone Table (Logic-Driven)

| Milestone |      Module     |            Feature            |                            Description                           | Backend (FastAPI) | Frontend (React) | Priority |
|-----------|-----------------|-------------------------------|------------------------------------------------------------------|-------------------|------------------|----------|
| **M1**    | Foundation      | Repository & Tooling Setup    | Initialize repo with linting, formatting, and baseline tooling   | Project setup, env config | App scaffold, base layout | High |
| **M1**    | Foundation      | Health Check Endpoint         | Expose a simple API endpoint to verify backend availability      | `GET /health` | N/A | High |
| **M1**    | Foundation      | Base App Layout               | Provide a minimal shell to host the core user flow               | N/A | Base layout + routing | High |
| **M2**    | Data            | Domain Models                 | Define core domain entities for cocktails and filtering          | Cocktail, Vibe, Occasion, Difficulty, AlcoholLevel models | N/A | High |
| **M2**    | Data            | Data Seeding Script           | Seed a curated cocktail catalog with exactly 3 cocktails per vibe| Seed script | N/A | High |
| **M3**    | Vibe Selection  | Vibe List Retrieval           | Fetch available vibes for user selection                         | `GET /vibes` | Vibe card grid | High |
| **M3**    | Filters         | Occasion Filter               | Allow occasion input that influences results without blocking.   | Query param (non-blocking) | Toggle buttons | Medium |
| **M3**    | Filters         | Difficulty Slider             | Accept difficulty input to adjust cocktail complexity            | Query param | Slider with labels (Lazy → Impress) | High |
| **M3**    | Recommendations | Curated Cocktail Results      | Return exactly 3 cocktails matching vibe and filters             | `GET /cocktails?vibe=&difficulty=&occasion=` (limit enforced) | Results list (3 cards only) | High |
| **M3**    | Recipe          | Recipe Detail Endpoint        | Fetch full recipe data for a selected cocktail                   | `GET /cocktails/{id}` | N/A | High |
| **M4**    | UI Flow         | Vibe Selection Screen         | Allow users to start the flow by selecting a vibe                | N/A | Vibe selection screen | High |
| **M4**    | UI Flow         | Filter Controls               | Display optional occasion toggle and difficulty slider together  | N/A | Filter controls UI | High |
| **M4**    | UI Flow         | Results View                  | Display 3 curated cocktails after selection                      | N/A | Results view (3 cards) | High |
| **M4**    | Recipe View     | Recipe Detail View            | Display ingredients, ratios, and 3–5 preparation steps           | N/A | Recipe screen | High |
| **M4**    | Recipe View     | Ingredient List Display       | Show ingredient list for a cocktail                              | Data field exposure | Ingredient list UI | High |
| **M4**    | Recipe View     | Step-by-Step Instructions     | Present concise preparation steps (max 5)                        | Data field exposure | Bullet step UI | High |
| **M5**    | Analytics       | Vibe Selected Event           | Track when a user selects a vibe                                 | Event emission | Event trigger | Medium |
| **M5**    | Analytics       | Recipe Opened Event           | Track when a recipe detail is opened                             | Event emission | Event trigger | Medium |
| **M5**    | Performance     | Speed-to-Decision Optimization| Ensure user can reach a decision in under 60 seconds             | API response performance | UI latency & flow tuning | Medium |
| **M5**    | Quality         | Test Coverage                 | Add tests for core API and UI flows                              | API tests | UI tests | Medium |
| **M5**    | Deployment      | Production Deployment         | Deploy backend and frontend to production environment            | API deployment | Frontend deployment | High |

---
