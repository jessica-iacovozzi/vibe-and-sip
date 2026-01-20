export type DifficultyRange = {
  min?: number;
  max?: number;
};

type DifficultyConfig = {
  id: string;
  label: string;
  range: DifficultyRange;
};

export const DIFFICULTY_QUERY_PARAM = 'difficulty';

export const DIFFICULTY_URL_SYNC_ENABLED = true;

export const DEFAULT_DIFFICULTY_ID = 'difficulty-balanced';

export const DIFFICULTY_HELPER_TEXT = 'Difficulty affects ingredient count and steps.';

export const COMPLEXITY_WEIGHTS = {
  ingredientCount: 1,
  stepCount: 1,
};

export const DIFFICULTY_LEVELS: DifficultyConfig[] = [
  {
    id: 'difficulty-lazy',
    label: 'Lazy',
    range: { max: 5 },
  },
  {
    id: 'difficulty-balanced',
    label: 'Balanced',
    range: { min: 6, max: 11 },
  },
  {
    id: 'difficulty-impress',
    label: 'Impress',
    range: { min: 12 },
  },
];
