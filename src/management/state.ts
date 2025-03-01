import { DataStorageContent } from '@/application/contracts';

export const initialState: DataStorageContent = {
  cities: [],
  options: {
    homeCity: 'São Luís',
    tempScale: 'metric',
    hasAutoOverlay: true
  }
};
