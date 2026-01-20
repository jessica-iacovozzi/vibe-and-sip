import type { Cocktail } from '../models';
import type { DifficultyRange } from '../domain/difficultyConfig';
import { COMPLEXITY_WEIGHTS } from '../domain/difficultyConfig';

type ComplexityWeights = typeof COMPLEXITY_WEIGHTS;

type ComplexityParts = {
  ingredientScore: number;
  stepScore: number;
};

const computeParts = (cocktail: Cocktail, weights: ComplexityWeights): ComplexityParts => ({
  ingredientScore: cocktail.ingredients.length * weights.ingredientCount,
  stepScore: cocktail.steps.length * weights.stepCount,
});

const computeComplexityScore = (cocktail: Cocktail): number => {
  const { ingredientScore, stepScore } = computeParts(cocktail, COMPLEXITY_WEIGHTS);
  return ingredientScore + stepScore;
};

const isScoreWithinRange = (score: number, range: DifficultyRange): boolean => {
  const { min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY } = range;
  return score >= min && score <= max;
};

export { computeComplexityScore, isScoreWithinRange };
