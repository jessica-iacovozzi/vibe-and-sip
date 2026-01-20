import { afterEach, describe, expect, it, vi } from 'vitest';

import { buildCocktailsUrl, fetchCocktails } from './api';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('buildCocktailsUrl', () => {
  it('builds a default cocktails URL with pagination', () => {
    expect(buildCocktailsUrl()).toBe('/cocktails?difficulty=difficulty-balanced&page=1&limit=12');
  });

  it('includes selected filters and pagination values', () => {
    expect(
      buildCocktailsUrl({
        vibeId: 'vibe-chill',
        occasionId: 'occasion-solo',
        difficultyId: 'difficulty-lazy',
        page: 2,
        limit: 8,
      }),
    ).toBe(
      '/cocktails?vibe=vibe-chill&occasion=occasion-solo&difficulty=difficulty-lazy&page=2&limit=8',
    );
  });
});

describe('fetchCocktails', () => {
  it('returns the cocktails response payload', async () => {
    const payload = {
      items: [{ id: 'cocktail-1', name: 'Cocktail 1', description: 'Desc', imageUrl: null }],
      page: 1,
      limit: 12,
      total: 1,
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => payload,
    }));

    await expect(fetchCocktails()).resolves.toEqual(payload);
    expect(fetch).toHaveBeenCalledWith('/cocktails?difficulty=difficulty-balanced&page=1&limit=12', {
      signal: undefined,
    });
  });

  it('throws when the response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Bad Request',
      text: async () => 'Invalid query',
    }));

    await expect(fetchCocktails()).rejects.toThrow('Failed to fetch cocktails: Invalid query');
  });
});
