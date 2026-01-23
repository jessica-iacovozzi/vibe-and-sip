import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import useVibes from '../utils/useVibes';
import AppLayout from './AppLayout';

vi.mock('../data', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('../data');

  return {
    ...actual,
    cocktails: [
      {
        id: 'cocktail-custom',
        name: 'Custom Cocktail',
        description: 'Test cocktail description',
        ingredients: [{ name: 'Gin', amount: '2', unit: 'oz' }],
        steps: ['Shake with ice.'],
        imageUrl: null,
        difficultyId: 'difficulty-balanced',
        alcoholLevelId: 'alcohol-medium',
        vibeIds: ['vibe-chill'],
        occasionIds: ['occasion-solo'],
      },
    ],
  };
});

vi.mock('../utils/useVibes', () => ({
  default: vi.fn(),
}));

type UseVibesResponse = ReturnType<typeof useVibes>;

type VibeOverrides = Partial<UseVibesResponse>;

const mockUseVibes = vi.mocked(useVibes);

const buildVibesState = (overrides: VibeOverrides = {}): UseVibesResponse => ({
  vibes: [
    {
      id: 'vibe-chill',
      name: 'Chill Night',
      description: 'Low-key, relaxed, and cozy drinks for winding down.',
      imageUrl: 'moon',
      tags: ['cozy'],
    },
  ],
  isLoading: false,
  error: '',
  reload: vi.fn(),
  ...overrides,
});

describe('AppLayout recipe modal', () => {
  beforeEach(() => {
    mockUseVibes.mockReset();
    mockUseVibes.mockReturnValue(buildVibesState());

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          items: [
            {
              id: 'cocktail-custom',
              name: 'Custom Cocktail',
              description: 'Test cocktail description',
              imageUrl: null,
            },
          ],
          page: 1,
          limit: 12,
          total: 1,
        }),
      }),
    );
  });

  it('renders ingredients and steps from the selected recipe', async () => {
    render(<AppLayout />);

    fireEvent.click(screen.getByRole('button', { name: 'Chill Night' }));
    fireEvent.click(screen.getByRole('button', { name: 'See drinks' }));

    fireEvent.click(await screen.findByRole('button', { name: 'View Custom Cocktail recipe' }));

    expect(screen.getByRole('dialog', { name: 'Custom Cocktail' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ingredients' })).toBeInTheDocument();
    expect(screen.getByText('Gin')).toBeInTheDocument();
    expect(screen.getByText(/2\s*oz/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Preparation' })).toBeInTheDocument();
    expect(screen.getByText('Shake with ice.')).toBeInTheDocument();
  });

  it('hides serve details when glassware and garnish are missing', async () => {
    render(<AppLayout />);

    fireEvent.click(screen.getByRole('button', { name: 'Chill Night' }));
    fireEvent.click(screen.getByRole('button', { name: 'See drinks' }));

    fireEvent.click(await screen.findByRole('button', { name: 'View Custom Cocktail recipe' }));

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Serve' })).not.toBeInTheDocument();
    });
  });
});
