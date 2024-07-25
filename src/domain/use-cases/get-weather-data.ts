import { WeatherData } from 'domain/entities/WeatherData';
import { DefaultError } from 'domain/errors/DefaultError';
import { OpenWeatherTempScale } from 'domain/external/OpenWeatherData';

export type GetWeatherData = {
  execute(param: { city: string; scale: OpenWeatherTempScale }): Promise<WeatherData | DefaultError>;
};
