import type { Cocktail, FilterCriteria } from "../models";

const matchesSingle = (selectedId: string, itemId: string): boolean =>
  selectedId.length === 0 || selectedId === itemId;

const matchesMulti = (selectedIds: string[], itemIds: string[]): boolean =>
  selectedIds.length === 0 || selectedIds.some((id) => itemIds.includes(id));

const normalizeCriteria = (criteria: FilterCriteria): Required<FilterCriteria> => {
  const {
    vibeIds = [],
    occasionIds = [],
    difficultyId = "",
    alcoholLevelId = "",
  } = criteria;

  return {
    vibeIds,
    occasionIds,
    difficultyId,
    alcoholLevelId,
  };
};

const isEmptyCriteria = (criteria: FilterCriteria): boolean => {
  const { vibeIds, occasionIds, difficultyId, alcoholLevelId } =
    normalizeCriteria(criteria);

  return (
    vibeIds.length === 0 &&
    occasionIds.length === 0 &&
    difficultyId.length === 0 &&
    alcoholLevelId.length === 0
  );
};

const matchesCriteria = (cocktail: Cocktail, criteria: FilterCriteria): boolean => {
  const { vibeIds, occasionIds, difficultyId, alcoholLevelId } =
    normalizeCriteria(criteria);

  if (!matchesSingle(difficultyId, cocktail.difficultyId)) {
    return false;
  }

  if (!matchesSingle(alcoholLevelId, cocktail.alcoholLevelId)) {
    return false;
  }

  if (!matchesMulti(vibeIds, cocktail.vibeIds)) {
    return false;
  }

  if (!matchesMulti(occasionIds, cocktail.occasionIds)) {
    return false;
  }

  return true;
};

const filterCocktails = (
  cocktails: Cocktail[],
  criteria: FilterCriteria = {},
): Cocktail[] => {
  if (cocktails.length === 0) {
    return [];
  }

  if (isEmptyCriteria(criteria)) {
    return cocktails;
  }

  return cocktails.filter((cocktail) => matchesCriteria(cocktail, criteria));
};

export default filterCocktails;
