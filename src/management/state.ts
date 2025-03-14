import { StorageContent } from '@/domain/entities/storage-content.entity';

export const initialState: StorageContent = {
  cities: [],
  options: {
    homeCity: 'São Luís',
    tempScale: 'metric',
    hasAutoOverlay: true
  }
};
