import { WeatherData } from 'domain/entities/WeatherData';
import { DefaultError } from 'domain/errors/DefaultError';
import { GetWeatherData } from 'domain/use-cases/get-weather-data';
import { WeatherGateway } from 'infra/gateways/WeatherGateway';

export const makeGetWeatherDataUseCase = (gateway: WeatherGateway) => {
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
