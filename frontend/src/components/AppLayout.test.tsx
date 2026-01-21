import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import AppLayout from './AppLayout';
import useVibes from '../utils/useVibes';

type UseVibesResponse = ReturnType<typeof useVibes>;

type VibeOverrides = Partial<UseVibesResponse>;

const mockUseVibes = vi.mocked(useVibes);

const buildVibesState = (overrides: VibeOverrides = {}): UseVibesResponse => ({
  vibes: [],
  isLoading: false,
  error: '',
  reload: vi.fn(),
  ...overrides,
});

const sampleVibes = [
  {
    id: 'vibe-chill',
    name: 'Chill Night',
    description: 'Low-key, relaxed, and cozy drinks for winding down.',
    imageUrl: 'moon',
    tags: ['cozy'],
  },
];

describe('AppLayout cocktail results', () => {
  beforeEach(() => {
    mockUseVibes.mockReset();
    mockUseVibes.mockReturnValue(buildVibesState({ vibes: sampleVibes }));
  });

  it('renders the results list from the cocktails response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          items: [
            {
              id: 'cocktail-test',
              name: 'Test Cocktail',
              description: 'Test description',
              imageUrl: null,
            },
          ],
          page: 1,
          limit: 12,
          total: 1,
        }),
      }),
    );

    render(<AppLayout />);

    fireEvent.click(screen.getByRole('button', { name: 'Chill Night' }));
    fireEvent.click(screen.getByRole('button', { name: 'See drinks' }));

    expect(await screen.findByText('Recommended cocktails')).toBeInTheDocument();
    expect(await screen.findByText('Test Cocktail')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('waits to fetch cocktails until the CTA is clicked', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        items: [],
        page: 1,
        limit: 12,
        total: 0,
      }),
    });

    vi.stubGlobal('fetch', fetchMock);

    render(<AppLayout />);

    fireEvent.click(screen.getByRole('button', { name: 'Chill Night' }));

    expect(fetchMock).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'See drinks' }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
  });

  it('shows the empty state and clears filters', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          items: [],
          page: 1,
          limit: 12,
          total: 0,
        }),
      }),
    );

    render(<AppLayout />);

    fireEvent.click(screen.getByRole('button', { name: 'Chill Night' }));
    fireEvent.click(screen.getByRole('button', { name: 'See drinks' }));

    expect(await screen.findByText('No cocktails match those filters yet.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));

    await waitFor(() => {
      expect(screen.queryByText('No cocktails match those filters yet.')).not.toBeInTheDocument();
    });
  });

  it('requests the next page of results when pagination is used', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          items: [
            {
              id: 'cocktail-test',
              name: 'Test Cocktail',
              description: 'Test description',
              imageUrl: null,
            },
          ],
          page: 1,
          limit: 12,
          total: 24,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          items: [
            {
              id: 'cocktail-test-2',
              name: 'Test Cocktail 2',
              description: 'Another description',
              imageUrl: null,
            },
          ],
          page: 2,
          limit: 12,
          total: 24,
        }),
      });

    vi.stubGlobal('fetch', fetchMock);

    render(<AppLayout />);

    fireEvent.click(screen.getByRole('button', { name: 'Chill Night' }));
    fireEvent.click(screen.getByRole('button', { name: 'See drinks' }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/cocktails?vibe=vibe-chill&difficulty=difficulty-balanced&page=1&limit=12',
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
      );
    });

    fireEvent.click(await screen.findByRole('button', { name: 'Next' }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/cocktails?vibe=vibe-chill&difficulty=difficulty-balanced&page=2&limit=12',
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
      );
    });
  });
});

vi.mock('../utils/useVibes', () => ({
  default: vi.fn(),
}));

afterEach(() => {
  vi.restoreAllMocks();
});

describe('AppLayout occasion filter', () => {
  beforeEach(() => {
    mockUseVibes.mockReset();
  });

  it('toggles the occasion selection and allows resetting to All', () => {
    mockUseVibes.mockReturnValue(buildVibesState());

    render(<AppLayout />);

    const allButton = screen.getByRole('button', { name: 'All' });
    const coupleButton = screen.getByRole('button', { name: 'Couple' });

    expect(allButton).toHaveAttribute('aria-pressed', 'true');
    expect(coupleButton).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(coupleButton);

    expect(allButton).toHaveAttribute('aria-pressed', 'false');
    expect(coupleButton).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(allButton);

    expect(allButton).toHaveAttribute('aria-pressed', 'true');
    expect(coupleButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('exposes accessible toggle group semantics', () => {
    mockUseVibes.mockReturnValue(buildVibesState());

    render(<AppLayout />);

    expect(screen.getByRole('group', { name: 'Occasion filter' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed');
    expect(screen.getByRole('button', { name: 'Solo' })).toHaveAttribute('aria-pressed');
  });
});

describe('AppLayout vibe grid states', () => {
  beforeEach(() => {
    mockUseVibes.mockReset();
  });

  it('renders the loading state', () => {
    mockUseVibes.mockReturnValue(buildVibesState({ isLoading: true }));

    render(<AppLayout />);

    expect(screen.getByText('Loading vibes...')).toBeInTheDocument();
  });

  it('renders the error state with retry', () => {
    const reload = vi.fn();
    mockUseVibes.mockReturnValue(
      buildVibesState({
        error: 'Unable to load vibes.',
        reload,
      }),
    );

    render(<AppLayout />);

    expect(screen.getByText('Unable to load vibes.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('renders the vibe cards when data is available', () => {
    mockUseVibes.mockReturnValue(
      buildVibesState({
        vibes: [
          {
            id: 'vibe-chill',
            name: 'Chill Night',
            description: 'Low-key, relaxed, and cozy drinks for winding down.',
            imageUrl: 'moon',
            tags: ['cozy'],
          },
        ],
      }),
    );

    render(<AppLayout />);

    expect(screen.getByText('Chill Night')).toBeInTheDocument();
    expect(
      screen.getByText('Low-key, relaxed, and cozy drinks for winding down.'),
    ).toBeInTheDocument();
  });

  it('shows the CTA with an accessible label after selecting a vibe', () => {
    mockUseVibes.mockReturnValue(buildVibesState({ vibes: sampleVibes }));

    render(<AppLayout />);

    expect(screen.queryByRole('button', { name: 'See drinks' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Chill Night' }));

    expect(screen.getByRole('button', { name: 'See drinks' })).toBeInTheDocument();
  });
});

describe('AppLayout difficulty slider', () => {
  beforeEach(() => {
    mockUseVibes.mockReset();
    window.history.replaceState(null, '', '/');
  });

  it('defaults to Balanced and includes difficulty in the request URL', () => {
    mockUseVibes.mockReturnValue(buildVibesState({ vibes: sampleVibes }));

    render(<AppLayout />);

    expect(screen.getByText('Balanced', { selector: '.difficulty-value' })).toBeInTheDocument();
    expect(screen.getByLabelText('Difficulty')).toHaveValue('1');

    fireEvent.click(screen.getByRole('button', { name: 'Chill Night' }));

    const actionButton = screen.getByRole('button', { name: 'See drinks' });
    expect(actionButton).toHaveAttribute('data-request-url', expect.stringContaining('difficulty='));
  });

  it('updates the label and request URL when the slider changes', () => {
    mockUseVibes.mockReturnValue(buildVibesState({ vibes: sampleVibes }));

    render(<AppLayout />);

    fireEvent.click(screen.getByRole('button', { name: 'Chill Night' }));
    fireEvent.change(screen.getByLabelText('Difficulty'), { target: { value: '2' } });

    expect(screen.getByText('Impress', { selector: '.difficulty-value' })).toBeInTheDocument();
    const actionButton = screen.getByRole('button', { name: 'See drinks' });
    expect(actionButton).toHaveAttribute(
      'data-request-url',
      expect.stringContaining('difficulty=difficulty-impress'),
    );
  });
});
