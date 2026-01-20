import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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

vi.mock('../utils/useVibes', () => ({
  default: vi.fn(),
}));

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

    const actionButton = screen.getByRole('button', { name: 'Start drink pairing' });
    expect(actionButton).toHaveAttribute('data-request-url', expect.stringContaining('difficulty='));
  });

  it('updates the label and request URL when the slider changes', () => {
    mockUseVibes.mockReturnValue(buildVibesState({ vibes: sampleVibes }));

    render(<AppLayout />);

    fireEvent.click(screen.getByRole('button', { name: 'Chill Night' }));
    fireEvent.change(screen.getByLabelText('Difficulty'), { target: { value: '2' } });

    expect(screen.getByText('Impress', { selector: '.difficulty-value' })).toBeInTheDocument();
    const actionButton = screen.getByRole('button', { name: 'Start drink pairing' });
    expect(actionButton).toHaveAttribute(
      'data-request-url',
      expect.stringContaining('difficulty=difficulty-impress'),
    );
  });
});
