import { DEFAULT_DIFFICULTY_ID, DIFFICULTY_QUERY_PARAM } from '../domain/difficultyConfig';

export type VibeResponse = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  tags: string[];
};

export type CocktailListItem = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
};

export type CocktailsResponse = {
  items: CocktailListItem[];
  page: number;
  limit: number;
  total: number;
};

type FetchVibesParams = {
  signal?: AbortSignal;
  occasionId?: string;
};

type CocktailsQueryParams = {
  vibeId?: string;
  difficultyId?: string;
  occasionId?: string;
  page?: number;
  limit?: number;
  signal?: AbortSignal;
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
  page = 1,
  limit = 12,
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
  params.set('page', String(page));
  params.set('limit', String(limit));
  return `/cocktails?${params.toString()}`;
};

export const fetchCocktails = async ({
  signal,
  ...query
}: CocktailsQueryParams = {}): Promise<CocktailsResponse> => {
  const response = await fetch(buildCocktailsUrl(query), { signal });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to fetch cocktails: ${message || response.statusText}`);
  }

  return (await response.json()) as CocktailsResponse;
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
