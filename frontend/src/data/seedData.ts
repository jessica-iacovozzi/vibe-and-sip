import type { AlcoholLevel, Cocktail, Difficulty, Occasion, Vibe } from '../models';

export const vibes: Vibe[] = [
  {
    id: 'vibe-chill',
    name: 'Chill Night',
    description: 'Low-key, relaxed, and cozy drinks for winding down.',
    imageUrl: 'moon',
    tags: ['cozy', 'relaxed'],
  },
  {
    id: 'vibe-date',
    name: 'Date Night',
    description: 'Polished, romantic drinks with a little flair.',
    imageUrl: 'spark',
    tags: ['romantic', 'polished'],
  },
  {
    id: 'vibe-party',
    name: 'Party',
    description: 'Bold, crowd-pleasing drinks for groups.',
    imageUrl: 'confetti',
    tags: ['bold', 'group'],
  },
  {
    id: 'vibe-cozy',
    name: 'Cozy',
    description: 'Warm, inviting drinks that feel like a blanket.',
    imageUrl: 'candle',
    tags: ['warm', 'inviting'],
  },
  {
    id: 'vibe-fancy-easy',
    name: 'Fancy-but-Easy',
    description: 'Impressive-looking drinks that stay simple to make.',
    imageUrl: 'star',
    tags: ['easy', 'impressive'],
  },
];

export const occasions: Occasion[] = [
  {
    id: 'occasion-solo',
    name: 'Solo',
    description: 'A relaxed drink for one.',
  },
  {
    id: 'occasion-couple',
    name: 'Couple',
    description: 'A shared drink moment for two.',
  },
  {
    id: 'occasion-hosting-friends',
    name: 'Hosting Friends',
    description: 'Batch-friendly or easy crowd-ready drinks.',
  },
];

export const difficulties: Difficulty[] = [
  {
    id: 'difficulty-lazy',
    label: 'Lazy',
    rank: 1,
  },
  {
    id: 'difficulty-balanced',
    label: 'Balanced',
    rank: 2,
  },
  {
    id: 'difficulty-impress',
    label: 'Impress',
    rank: 3,
  },
];

export const alcoholLevels: AlcoholLevel[] = [
  {
    id: 'alcohol-light',
    label: 'Light',
    rank: 1,
  },
  {
    id: 'alcohol-medium',
    label: 'Medium',
    rank: 2,
  },
  {
    id: 'alcohol-strong',
    label: 'Strong',
    rank: 3,
  },
];

export const cocktails: Cocktail[] = [
  {
    id: 'cocktail-midnight-spritz',
    name: 'Midnight Spritz',
    description: 'A crisp, low-effort spritz for winding down.',
    imageUrl: 'midnight-spritz.jpg',
    ingredients: [
      { name: 'Aperitivo', amount: '2', unit: 'oz' },
      { name: 'Sparkling water', amount: '3', unit: 'oz' },
      { name: 'Citrus slice', amount: '1', unit: 'slice' },
      { name: 'Ice', amount: '1', unit: 'handful' },
    ],
    steps: [
      'Fill a wine glass with ice.',
      'Add aperitivo and top with sparkling water.',
      'Stir gently and garnish with citrus.',
    ],
    glassware: 'Wine glass',
    garnish: 'Citrus slice',
    tags: {
      spirit: ['aperitivo'],
      flavor: ['citrus', 'bright'],
    },
    difficultyId: 'difficulty-lazy',
    alcoholLevelId: 'alcohol-light',
    vibeIds: ['vibe-chill', 'vibe-cozy'],
    occasionIds: ['occasion-solo', 'occasion-couple'],
  },
  {
    id: 'cocktail-citrus-negroni',
    name: 'Citrus Negroni',
    description: 'A bright, balanced negroni with a zesty finish.',
    imageUrl: 'citrus-negroni.jpg',
    ingredients: [
      { name: 'Gin', amount: '1', unit: 'oz' },
      { name: 'Sweet vermouth', amount: '1', unit: 'oz' },
      { name: 'Bitter aperitivo', amount: '1', unit: 'oz' },
      { name: 'Orange peel', amount: '1', unit: 'peel' },
    ],
    steps: [
      'Add gin, vermouth, and aperitivo to a mixing glass with ice.',
      'Stir until chilled and strain into a rocks glass.',
      'Express orange peel oils and drop in.',
    ],
    glassware: 'Rocks glass',
    garnish: 'Orange peel',
    tags: {
      spirit: ['gin'],
      flavor: ['citrus', 'bitter'],
    },
    difficultyId: 'difficulty-balanced',
    alcoholLevelId: 'alcohol-strong',
    vibeIds: ['vibe-date', 'vibe-fancy-easy'],
    occasionIds: ['occasion-couple', 'occasion-hosting-friends'],
  },
  {
    id: 'cocktail-party-paloma',
    name: 'Party Paloma',
    description: 'A crowd-ready paloma built for easy batching.',
    imageUrl: 'party-paloma.jpg',
    ingredients: [
      { name: 'Grapefruit soda', amount: '4', unit: 'oz' },
      { name: 'Tequila', amount: '2', unit: 'oz' },
      { name: 'Lime juice', amount: '0.5', unit: 'oz' },
      { name: 'Sea salt', amount: '1', unit: 'pinch' },
      { name: 'Ice', amount: '1', unit: 'handful' },
    ],
    steps: [
      'Rim glasses with salt and fill with ice.',
      'Pour tequila and lime juice into each glass.',
      'Top with grapefruit soda and stir.',
    ],
    glassware: 'Highball glass',
    garnish: 'Grapefruit wedge',
    tags: {
      spirit: ['tequila'],
      flavor: ['grapefruit', 'salty'],
    },
    difficultyId: 'difficulty-lazy',
    alcoholLevelId: 'alcohol-medium',
    vibeIds: ['vibe-party'],
    occasionIds: ['occasion-hosting-friends'],
  },
  {
    id: 'cocktail-velvet-espresso',
    name: 'Velvet Espresso Martini',
    description: 'A sleek, rich espresso martini with a silky finish.',
    imageUrl: 'velvet-espresso.jpg',
    ingredients: [
      { name: 'Vodka', amount: '1.5', unit: 'oz' },
      { name: 'Espresso', amount: '1', unit: 'oz' },
      { name: 'Coffee liqueur', amount: '0.5', unit: 'oz' },
      { name: 'Simple syrup', amount: '0.25', unit: 'oz' },
    ],
    steps: [
      'Add all ingredients to a shaker with ice.',
      'Shake hard until frothy.',
      'Strain into a chilled coupe.',
    ],
    glassware: 'Coupe',
    garnish: 'Coffee beans',
    tags: {
      spirit: ['vodka'],
      flavor: ['coffee', 'rich'],
    },
    difficultyId: 'difficulty-impress',
    alcoholLevelId: 'alcohol-strong',
    vibeIds: ['vibe-date', 'vibe-fancy-easy'],
    occasionIds: ['occasion-couple'],
  },
  {
    id: 'cocktail-spiced-toddy',
    name: 'Spiced Warm Toddy',
    description: 'A cozy, aromatic sipper with gentle spice.',
    imageUrl: 'spiced-toddy.jpg',
    ingredients: [
      { name: 'Whiskey', amount: '2', unit: 'oz' },
      { name: 'Honey', amount: '0.5', unit: 'oz' },
      { name: 'Lemon', amount: '0.5', unit: 'oz' },
      { name: 'Hot water', amount: '4', unit: 'oz' },
      { name: 'Cinnamon', amount: '1', unit: 'stick' },
    ],
    steps: [
      'Add honey and lemon to a mug and stir.',
      'Pour in whiskey and top with hot water.',
      'Garnish with cinnamon.',
    ],
    glassware: 'Mug',
    garnish: 'Cinnamon stick',
    tags: {
      spirit: ['whiskey'],
      flavor: ['spiced', 'honey'],
    },
    difficultyId: 'difficulty-balanced',
    alcoholLevelId: 'alcohol-medium',
    vibeIds: ['vibe-cozy', 'vibe-chill'],
    occasionIds: ['occasion-solo'],
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
    ...formatMissing('vibe', cocktail.id, findMissingIds(cocktail.vibeIds, vibeIds)),
    ...formatMissing('occasion', cocktail.id, findMissingIds(cocktail.occasionIds, occasionIds)),
    ...formatMissing(
      'difficulty',
      cocktail.id,
      difficultyIds.has(cocktail.difficultyId) ? [] : [cocktail.difficultyId],
    ),
    ...formatMissing(
      'alcohol level',
      cocktail.id,
      alcoholIds.has(cocktail.alcoholLevelId) ? [] : [cocktail.alcoholLevelId],
    ),
  ]);
};
