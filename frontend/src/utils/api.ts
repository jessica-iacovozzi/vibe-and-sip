import { DEFAULT_DIFFICULTY_ID, DIFFICULTY_QUERY_PARAM } from '../domain/difficultyConfig';

export type VibeResponse = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  tags: string[];
};

type FetchVibesParams = {
  signal?: AbortSignal;
  occasionId?: string;
};

type CocktailsQueryParams = {
  vibeId?: string;
  difficultyId?: string;
  occasionId?: string;
};

const buildVibesUrl = (occasionId = ''): string => {
  if (occasionId.length === 0) {
    return '/vibes';
  }

  const params = new URLSearchParams({ occasion: occasionId });
  return `/vibes?${params.toString()}`;
};

export const buildCocktailsUrl = ({
  vibeId = '',
  difficultyId = DEFAULT_DIFFICULTY_ID,
  occasionId = '',
}: CocktailsQueryParams = {}): string => {
  const params = new URLSearchParams();
  const resolvedDifficulty = difficultyId.length > 0 ? difficultyId : DEFAULT_DIFFICULTY_ID;

  if (vibeId.length > 0) {
    params.set('vibe', vibeId);
  }

  if (occasionId.length > 0) {
    params.set('occasion', occasionId);
  }

  params.set(DIFFICULTY_QUERY_PARAM, resolvedDifficulty);
  return `/cocktails?${params.toString()}`;
};

export const fetchVibes = async (
  { signal, occasionId }: FetchVibesParams = {},
): Promise<{ vibes: VibeResponse[] }> => {
  const response = await fetch(buildVibesUrl(occasionId), { signal });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to fetch vibes: ${message || response.statusText}`);
  }

  const vibes = (await response.json()) as VibeResponse[];
  return { vibes };
};
