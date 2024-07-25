import { OpenWeatherTempScale } from 'domain/external/OpenWeatherData';

export type AppState = {
  cities: string[];
  options: {
    homeCity: string;
    tempScale: OpenWeatherTempScale;
  };
};

export const initialState: AppState = {
  cities: [],
  options: {
    homeCity: 'São Luís',
    tempScale: 'metric'
  }
};
