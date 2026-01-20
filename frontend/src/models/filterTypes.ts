export type MultiSelectIds = string[];

export type SingleSelectId = string;

export type FilterInput = {
  vibeIds?: MultiSelectIds;
  occasionId?: SingleSelectId;
  occasionIds?: MultiSelectIds;
  difficultyId?: SingleSelectId;
  alcoholLevelId?: SingleSelectId;
};

export type FilterCriteria = FilterInput;
