import { makeAxiosHttpClient } from 'infra/adapters/HttpClient';
import { WeatherGateway } from 'infra/gateways/WeatherGateway';

export const makeWeatherGateway = () =>
  new WeatherGateway(makeAxiosHttpClient());
