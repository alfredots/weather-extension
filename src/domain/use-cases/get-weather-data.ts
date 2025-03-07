import { WeatherData } from 'domain/entities/WeatherData';

export interface GetWeatherData {
  execute(param: { city: string; scale: 'metric' | 'imperial' }): Promise<WeatherData>;
}
