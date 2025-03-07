import { TemperatureScale } from '@/application/contracts/weather';

export type LocalStorageContent = {
  cities: string[];
  options: {
    homeCity: string;
    tempScale: TemperatureScale;
    hasAutoOverlay: boolean;
  };
};
