import { OpenWeatherTempScale } from '@/application/dto/weather-data-dto';

export type LocalStorageContent = {
  cities: string[];
  options: {
    homeCity: string;
    tempScale: OpenWeatherTempScale;
    hasAutoOverlay: boolean;
  };
};
