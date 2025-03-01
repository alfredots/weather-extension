import { OpenWeatherTempScale } from '@/application/dto/open-weather-data';

export type DataStorageContent = {
  cities: string[];
  options: {
    homeCity: string;
    tempScale: OpenWeatherTempScale;
    hasAutoOverlay: boolean;
  };
};
