import { cocktails } from '../data';

type VibeLike = {
  id: string;
};

const getOccasionVibeCounts = (occasionId: string): Map<string, number> => {
  if (occasionId.length === 0) {
    return new Map();
  }

  return cocktails
    .filter((cocktail) => cocktail.occasionIds.includes(occasionId))
    .flatMap((cocktail) => cocktail.vibeIds)
    .reduce((counts, vibeId) => {
      const currentCount = counts.get(vibeId) ?? 0;

      counts.set(vibeId, currentCount + 1);
      return counts;
    }, new Map<string, number>());
};

const scoreVibes = <T extends VibeLike>(vibes: T[], counts: Map<string, number>) =>
  vibes.map((vibe, index) => ({
    vibe,
    score: counts.get(vibe.id) ?? 0,
    index,
  }));

const rankVibesByOccasion = <T extends VibeLike>(vibes: T[], occasionId = ''): T[] => {
  if (occasionId.length === 0) {
    return vibes;
  }

  const vibeCounts = getOccasionVibeCounts(occasionId);
  const scored = scoreVibes(vibes, vibeCounts);
  const matching = scored.filter((item) => item.score > 0);
  const nonMatching = scored.filter((item) => item.score === 0);
  const sortByScore = (left: typeof scored[number], right: typeof scored[number]) =>
    right.score - left.score || left.index - right.index;

  return [...matching.sort(sortByScore), ...nonMatching].map((item) => item.vibe);
};

export default rankVibesByOccasion;
