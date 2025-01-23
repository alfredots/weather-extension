import { WeatherData } from 'domain/entities/WeatherData';
import { OpenWeatherTempScale } from 'domain/external/OpenWeatherData';

export interface WeatherRepository {
  getWeatherData(city: string, scale: OpenWeatherTempScale): Promise<WeatherData>;
}
