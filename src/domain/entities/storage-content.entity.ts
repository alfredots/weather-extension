import { TemperatureScale } from '@/domain/utils/temperature-scale';

export type StorageContent = {
  cities: string[];
  options: {
    homeCity: string;
    tempScale: TemperatureScale;
    hasAutoOverlay: boolean;
  };
};
