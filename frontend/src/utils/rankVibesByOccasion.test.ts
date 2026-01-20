import { describe, expect, it } from 'vitest';

import rankVibesByOccasion from './rankVibesByOccasion';

describe('rankVibesByOccasion', () => {
  const vibes = [
    { id: 'vibe-chill', name: 'Chill Night' },
    { id: 'vibe-date', name: 'Date Night' },
    { id: 'vibe-party', name: 'Party' },
  ];

  it('returns the original order when no occasion is selected', () => {
    const ranked = rankVibesByOccasion(vibes, '');

    expect(ranked).toEqual(vibes);
  });

  it('prioritizes matching vibes for the selected occasion', () => {
    const ranked = rankVibesByOccasion(vibes, 'occasion-couple');

    expect(ranked[0]?.id).toBe('vibe-date');
    expect(ranked[1]?.id).toBe('vibe-chill');
  });
});
