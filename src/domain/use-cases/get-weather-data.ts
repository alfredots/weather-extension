import { WeatherData } from 'domain/entities/WeatherData';
import { OpenWeatherTempScale } from '@/application/dto/weather-data-dto';

export interface GetWeatherData {
  execute(param: { city: string; scale: OpenWeatherTempScale }): Promise<WeatherData>;
}
