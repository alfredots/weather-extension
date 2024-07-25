import { WeatherData } from 'domain/entities/WeatherData';
import { DefaultError } from 'domain/errors/DefaultError';
import { OpenWeatherTempScale } from 'domain/external/OpenWeatherData';

export interface WeatherRepository {
  getWeatherData(city: string, scale: OpenWeatherTempScale): Promise<WeatherData | DefaultError>;
}
