import { WeatherData } from 'domain/entities/WeatherData';
import { OpenWeatherTempScale } from '@/application/dto/open-weather-data';

export interface GetWeatherData {
  execute(param: { city: string; scale: OpenWeatherTempScale }): Promise<WeatherData>;
}
