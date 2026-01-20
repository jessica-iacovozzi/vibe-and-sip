import { describe, expect, it } from 'vitest';

import { cocktails } from '../domain';
import { computeComplexityScore, isScoreWithinRange } from './complexity';

const targetCocktail = cocktails.find((cocktail) => cocktail.id === 'cocktail-midnight-spritz');

if (!targetCocktail) {
  throw new Error('Expected cocktail-midnight-spritz to be defined in seed data.');
}

describe('complexity utilities', () => {
  it('computes complexity score from ingredients and steps', () => {
    const score = computeComplexityScore(targetCocktail);

    expect(score).toBe(7);
  });

  it('checks when scores fall within a difficulty range', () => {
    expect(isScoreWithinRange(7, { max: 7 })).toBe(true);
    expect(isScoreWithinRange(7, { max: 6 })).toBe(false);
    expect(isScoreWithinRange(7, { min: 7 })).toBe(true);
  });
});
