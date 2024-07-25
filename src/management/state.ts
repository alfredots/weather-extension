import { OpenWeatherTempScale } from 'domain/external/OpenWeatherData';

export type AppState = {
  cities: string[];
  options: {
    tempScale: OpenWeatherTempScale;
  };
};

export const initialState: AppState = {
  cities: [],
  options: {
    tempScale: 'metric'
  }
};
