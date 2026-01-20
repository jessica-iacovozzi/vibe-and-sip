import { occasions } from '../data';

type OccasionOption = {
  id: string;
  label: string;
  description: string;
};

const allOccasionsOption: OccasionOption = {
  id: '',
  label: 'All',
  description: 'Show every occasion without filtering.',
};

const occasionOptions: OccasionOption[] = [
  allOccasionsOption,
  ...occasions.map((occasion) => ({
    id: occasion.id,
    label: occasion.name,
    description: occasion.description,
  })),
];

export { allOccasionsOption, occasionOptions };
export type { OccasionOption };
