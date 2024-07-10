import { WeatherData } from 'domain/entities/WeatherData';
import { DefaultError } from 'domain/errors/DefaultError';

export type GetWeatherData = {
  execute(param: string): Promise<WeatherData | DefaultError>;
};
