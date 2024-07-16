import { WeatherData } from 'domain/entities/WeatherData';
import { DefaultError } from 'domain/errors/DefaultError';
import { GetWeatherData } from 'domain/use-cases/get-weather-data';
import { makeWeatherGateway } from './weather-gateway-factory';

export const makeGetWeatherDataUseCase = () => {
  const gateway = makeWeatherGateway();

  const getWeatherData: GetWeatherData = {
    execute: async function (
      city: string
    ): Promise<WeatherData | DefaultError> {
      return await gateway.getWeatherData(city);
    }
  };

  return {
    getWeatherData
  };
};
