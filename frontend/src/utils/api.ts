export type VibeResponse = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  tags: string[];
};

type FetchVibesParams = {
  signal?: AbortSignal;
};

export const fetchVibes = async (
  { signal }: FetchVibesParams = {},
): Promise<{ vibes: VibeResponse[] }> => {
  const response = await fetch('/vibes', { signal });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to fetch vibes: ${message || response.statusText}`);
  }

  const vibes = (await response.json()) as VibeResponse[];
  return { vibes };
};
