import type { AlcoholLevel, Cocktail, Difficulty, Occasion, Vibe } from "../models";

export const vibes: Vibe[] = [
  {
    id: "vibe-chill",
    name: "Chill Night",
    description: "Low-key, relaxed, and cozy drinks for winding down.",
    icon: "moon",
  },
  {
    id: "vibe-date",
    name: "Date Night",
    description: "Polished, romantic drinks with a little flair.",
    icon: "spark",
  },
  {
    id: "vibe-party",
    name: "Party",
    description: "Bold, crowd-pleasing drinks for groups.",
    icon: "confetti",
  },
  {
    id: "vibe-cozy",
    name: "Cozy",
    description: "Warm, inviting drinks that feel like a blanket.",
    icon: "candle",
  },
  {
    id: "vibe-fancy-easy",
    name: "Fancy-but-Easy",
    description: "Impressive-looking drinks that stay simple to make.",
    icon: "star",
  },
];

export const occasions: Occasion[] = [
  {
    id: "occasion-solo",
    name: "Solo",
    description: "A relaxed drink for one.",
  },
  {
    id: "occasion-couple",
    name: "Couple",
    description: "A shared drink moment for two.",
  },
  {
    id: "occasion-hosting-friends",
    name: "Hosting Friends",
    description: "Batch-friendly or easy crowd-ready drinks.",
  },
];

export const difficulties: Difficulty[] = [
  {
    id: "difficulty-lazy",
    label: "Lazy",
    rank: 1,
  },
  {
    id: "difficulty-moderate",
    label: "Moderate",
    rank: 2,
  },
  {
    id: "difficulty-impress",
    label: "Impress",
    rank: 3,
  },
];

export const alcoholLevels: AlcoholLevel[] = [
  {
    id: "alcohol-light",
    label: "Light",
    rank: 1,
  },
  {
    id: "alcohol-medium",
    label: "Medium",
    rank: 2,
  },
  {
    id: "alcohol-strong",
    label: "Strong",
    rank: 3,
  },
];

export const cocktails: Cocktail[] = [
  {
    id: "cocktail-midnight-spritz",
    name: "Midnight Spritz",
    description: "A crisp, low-effort spritz for winding down.",
    ingredients: ["Aperitivo", "sparkling water", "citrus slice", "ice"],
    steps: [
      "Fill a wine glass with ice.",
      "Add aperitivo and top with sparkling water.",
      "Stir gently and garnish with citrus.",
    ],
    difficultyId: "difficulty-lazy",
    alcoholLevelId: "alcohol-light",
    vibeIds: ["vibe-chill", "vibe-cozy"],
    occasionIds: ["occasion-solo", "occasion-couple"],
  },
  {
    id: "cocktail-citrus-negroni",
    name: "Citrus Negroni",
    description: "A bright, balanced negroni with a zesty finish.",
    ingredients: ["gin", "sweet vermouth", "bitter aperitivo", "orange peel"],
    steps: [
      "Add gin, vermouth, and aperitivo to a mixing glass with ice.",
      "Stir until chilled and strain into a rocks glass.",
      "Express orange peel oils and drop in.",
    ],
    difficultyId: "difficulty-moderate",
    alcoholLevelId: "alcohol-strong",
    vibeIds: ["vibe-date", "vibe-fancy-easy"],
    occasionIds: ["occasion-couple", "occasion-hosting-friends"],
  },
  {
    id: "cocktail-party-paloma",
    name: "Party Paloma",
    description: "A crowd-ready paloma built for easy batching.",
    ingredients: [
      "grapefruit soda",
      "tequila",
      "lime juice",
      "sea salt",
      "ice",
    ],
    steps: [
      "Rim glasses with salt and fill with ice.",
      "Pour tequila and lime juice into each glass.",
      "Top with grapefruit soda and stir.",
    ],
    difficultyId: "difficulty-lazy",
    alcoholLevelId: "alcohol-medium",
    vibeIds: ["vibe-party"],
    occasionIds: ["occasion-hosting-friends"],
  },
  {
    id: "cocktail-velvet-espresso",
    name: "Velvet Espresso Martini",
    description: "A sleek, rich espresso martini with a silky finish.",
    ingredients: ["vodka", "espresso", "coffee liqueur", "simple syrup"],
    steps: [
      "Add all ingredients to a shaker with ice.",
      "Shake hard until frothy.",
      "Strain into a chilled coupe.",
    ],
    difficultyId: "difficulty-impress",
    alcoholLevelId: "alcohol-strong",
    vibeIds: ["vibe-date", "vibe-fancy-easy"],
    occasionIds: ["occasion-couple"],
  },
  {
    id: "cocktail-spiced-toddy",
    name: "Spiced Warm Toddy",
    description: "A cozy, aromatic sipper with gentle spice.",
    ingredients: ["whiskey", "honey", "lemon", "hot water", "cinnamon"],
    steps: [
      "Add honey and lemon to a mug and stir.",
      "Pour in whiskey and top with hot water.",
      "Garnish with cinnamon.",
    ],
    difficultyId: "difficulty-moderate",
    alcoholLevelId: "alcohol-medium",
    vibeIds: ["vibe-cozy", "vibe-chill"],
    occasionIds: ["occasion-solo"],
  },
];

const createIdSet = <T extends { id: string }>(items: T[]): Set<string> =>
  new Set(items.map(({ id }) => id));

const findMissingIds = (ids: string[], allowed: Set<string>): string[] =>
  ids.filter((id) => !allowed.has(id));

const formatMissing = (label: string, cocktailId: string, ids: string[]): string[] =>
  ids.map((id) => `Cocktail ${cocktailId} missing ${label} ${id}`);

export const validateSeedData = (): string[] => {
  const vibeIds = createIdSet(vibes);
  const occasionIds = createIdSet(occasions);
  const difficultyIds = createIdSet(difficulties);
  const alcoholIds = createIdSet(alcoholLevels);

  return cocktails.flatMap((cocktail) => [
    ...formatMissing("vibe", cocktail.id, findMissingIds(cocktail.vibeIds, vibeIds)),
    ...formatMissing(
      "occasion",
      cocktail.id,
      findMissingIds(cocktail.occasionIds, occasionIds),
    ),
    ...formatMissing(
      "difficulty",
      cocktail.id,
      difficultyIds.has(cocktail.difficultyId) ? [] : [cocktail.difficultyId],
    ),
    ...formatMissing(
      "alcohol level",
      cocktail.id,
      alcoholIds.has(cocktail.alcoholLevelId) ? [] : [cocktail.alcoholLevelId],
    ),
  ]);
};
