import { useCallback, useEffect, useState } from 'react';

import { fetchVibes, type VibeResponse } from './api';

type VibeState = {
  vibes: VibeResponse[];
  isLoading: boolean;
  error: string;
};

type UseVibesResponse = VibeState & {
  reload: () => Promise<void>;
};

const defaultState: VibeState = {
  vibes: [],
  isLoading: true,
  error: '',
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Failed to fetch vibes.';
};

const useVibes = (): UseVibesResponse => {
  const [state, setState] = useState<VibeState>(defaultState);

  const loadVibes = useCallback(async () => {
    setState((prevState) => ({ ...prevState, isLoading: true, error: '' }));

    try {
      const { vibes } = await fetchVibes();
      setState({ vibes, isLoading: false, error: '' });
    } catch (error) {
      setState({ vibes: [], isLoading: false, error: getErrorMessage(error) });
    }
  }, []);

  useEffect(() => {
    loadVibes().catch(() => {});
  }, [loadVibes]);

  return {
    ...state,
    reload: loadVibes,
  };
};

export default useVibes;
