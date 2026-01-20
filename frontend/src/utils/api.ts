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

const buildVibesUrl = (occasionId = ''): string => {
  if (occasionId.length === 0) {
    return '/vibes';
  }

  const params = new URLSearchParams({ occasion: occasionId });
  return `/vibes?${params.toString()}`;
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
