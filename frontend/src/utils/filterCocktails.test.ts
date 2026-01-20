import { describe, expect, it } from 'vitest';

import { cocktails, filterCocktails } from '../domain';

const getIds = (items: Array<{ id: string }>): string[] => items.map((item) => item.id).sort();

describe('filterCocktails', () => {
  it('filters by difficulty only', () => {
    const results = filterCocktails(cocktails, {
      difficultyId: 'difficulty-lazy',
    });

    expect(getIds(results)).toEqual([]);
  });

  it('filters by balanced difficulty range', () => {
    const results = filterCocktails(cocktails, {
      difficultyId: 'difficulty-balanced',
    });

    expect(getIds(results)).toEqual(getIds(cocktails));
  });

  it('filters by impress difficulty range', () => {
    const results = filterCocktails(cocktails, {
      difficultyId: 'difficulty-impress',
    });

    expect(getIds(results)).toEqual([]);
  });

  it('filters by alcohol level only', () => {
    const results = filterCocktails(cocktails, {
      alcoholLevelId: 'alcohol-strong',
    });

    expect(getIds(results)).toEqual(['cocktail-citrus-negroni', 'cocktail-velvet-espresso']);
  });

  it('filters by vibes only', () => {
    const results = filterCocktails(cocktails, {
      vibeIds: ['vibe-cozy'],
    });

    expect(getIds(results)).toEqual(['cocktail-midnight-spritz', 'cocktail-spiced-toddy']);
  });

  it('filters by occasions only', () => {
    const results = filterCocktails(cocktails, {
      occasionIds: ['occasion-hosting-friends'],
    });

    expect(getIds(results)).toEqual(['cocktail-citrus-negroni', 'cocktail-party-paloma']);
  });

  it('filters by combined criteria', () => {
    const results = filterCocktails(cocktails, {
      vibeIds: ['vibe-date'],
      occasionIds: ['occasion-couple'],
      difficultyId: 'difficulty-balanced',
      alcoholLevelId: 'alcohol-strong',
    });

    expect(getIds(results)).toEqual(['cocktail-citrus-negroni']);
  });

  it('returns all cocktails for empty filters', () => {
    const results = filterCocktails(cocktails, {});

    expect(getIds(results)).toEqual(getIds(cocktails));
  });
});
