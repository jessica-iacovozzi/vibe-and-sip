export type Cocktail = {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  imageUrl?: string;
  difficultyId: string;
  alcoholLevelId: string;
  vibeIds: string[];
  occasionIds: string[];
};
