import { describe, expect, it } from 'vitest';

import { alcoholLevels, cocktails, difficulties, occasions, vibes } from '../domain';

type StringCheck = {
  value: unknown;
  field: string;
};

function expectNonEmptyString({ value, field }: StringCheck): void {
  expect(typeof value, `${field} should be a string`).toBe('string');

  if (typeof value !== 'string') {
    return;
  }

  expect(value.length).toBeGreaterThan(0);
}

function expectOptionalString({ value, field }: StringCheck): void {
  if (value === undefined) {
    return;
  }

  expectNonEmptyString({ value, field });
}

type ArrayCheck = {
  value: unknown;
  field: string;
};

function expectStringArray({ value, field }: ArrayCheck): void {
  expect(Array.isArray(value), `${field} should be an array`).toBe(true);

  if (!Array.isArray(value)) {
    return;
  }

  value.forEach((entry) => expectNonEmptyString({ value: entry, field: `${field} item` }));
}

type IngredientCheck = {
  value: unknown;
  field: string;
};

function expectIngredientArray({ value, field }: IngredientCheck): void {
  expect(Array.isArray(value), `${field} should be an array`).toBe(true);

  if (!Array.isArray(value)) {
    return;
  }

  value.forEach((entry) => {
    expect(typeof entry, `${field} item should be an object`).toBe('object');

    if (!entry || typeof entry !== 'object') {
      return;
    }

    const ingredient = entry as { name?: unknown; amount?: unknown; unit?: unknown };

    expectNonEmptyString({ value: ingredient.name, field: `${field} name` });
    expectNonEmptyString({ value: ingredient.amount, field: `${field} amount` });
    expectNonEmptyString({ value: ingredient.unit, field: `${field} unit` });
  });
}

type NumberCheck = {
  value: unknown;
  field: string;
};

function expectNumber({ value, field }: NumberCheck): void {
  expect(typeof value, `${field} should be a number`).toBe('number');

  if (typeof value !== 'number') {
    return;
  }

  expect(Number.isNaN(value)).toBe(false);
}

describe('model seed shapes', () => {
  it('validates vibes', () => {
    vibes.forEach((vibe) => {
      expectNonEmptyString({ value: vibe.id, field: 'vibe.id' });
      expectNonEmptyString({ value: vibe.name, field: 'vibe.name' });
      expectNonEmptyString({ value: vibe.description, field: 'vibe.description' });
      expectOptionalString({ value: vibe.imageUrl, field: 'vibe.imageUrl' });
    });
  });

  it('validates occasions', () => {
    occasions.forEach((occasion) => {
      expectNonEmptyString({ value: occasion.id, field: 'occasion.id' });
      expectNonEmptyString({ value: occasion.name, field: 'occasion.name' });
      expectNonEmptyString({ value: occasion.description, field: 'occasion.description' });
    });
  });

  it('validates difficulties', () => {
    difficulties.forEach((difficulty) => {
      expectNonEmptyString({ value: difficulty.id, field: 'difficulty.id' });
      expectNonEmptyString({ value: difficulty.label, field: 'difficulty.label' });
      expectNumber({ value: difficulty.rank, field: 'difficulty.rank' });
    });
  });

  it('validates alcohol levels', () => {
    alcoholLevels.forEach((level) => {
      expectNonEmptyString({ value: level.id, field: 'alcoholLevel.id' });
      expectNonEmptyString({ value: level.label, field: 'alcoholLevel.label' });
      expectNumber({ value: level.rank, field: 'alcoholLevel.rank' });
    });
  });

  it('validates cocktails', () => {
    cocktails.forEach((cocktail) => {
      expectNonEmptyString({ value: cocktail.id, field: 'cocktail.id' });
      expectNonEmptyString({ value: cocktail.name, field: 'cocktail.name' });
      expectNonEmptyString({ value: cocktail.description, field: 'cocktail.description' });
      expectIngredientArray({ value: cocktail.ingredients, field: 'ingredients' });
      expectStringArray({ value: cocktail.steps, field: 'steps' });
      expectOptionalString({ value: cocktail.imageUrl, field: 'cocktail.imageUrl' });
      expectNonEmptyString({ value: cocktail.difficultyId, field: 'cocktail.difficultyId' });
      expectNonEmptyString({ value: cocktail.alcoholLevelId, field: 'cocktail.alcoholLevelId' });
      expectStringArray({ value: cocktail.vibeIds, field: 'vibeIds' });
      expectStringArray({ value: cocktail.occasionIds, field: 'occasionIds' });
    });
  });
});
