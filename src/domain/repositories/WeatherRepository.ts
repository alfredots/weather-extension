import { WeatherData } from 'domain/entities/WeatherData';
import { DefaultError } from 'domain/errors/DefaultError';

export interface WeatherRepository {
  getWeatherData(city: string): Promise<WeatherData | DefaultError>;
}
