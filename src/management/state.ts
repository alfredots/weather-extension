import { LocalStorageContent } from '@/application/contracts';

export const initialState: LocalStorageContent = {
  cities: [],
  options: {
    homeCity: 'São Luís',
    tempScale: 'metric',
    hasAutoOverlay: true
  }
};
