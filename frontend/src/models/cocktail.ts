export type Ingredient = {
  name: string;
  amount: string;
  unit: string;
};

export type CocktailTags = {
  spirit: string[];
  flavor: string[];
};

export type Cocktail = {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  imageUrl?: string;
  glassware?: string;
  garnish?: string;
  tags?: CocktailTags;
  difficultyId: string;
  alcoholLevelId: string;
  vibeIds: string[];
  occasionIds: string[];
};
