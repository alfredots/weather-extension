import { WeatherGateway, IWeatherGateway } from '@/application/gateways';
import { endpoints } from '@/infra/endpoints';
import { OPEN_WEATHER_API_KEY } from '@/main/constants';
import { makeHttpClient } from '@/main/factories/http';

export const makeWeatherGateway = (): IWeatherGateway => new WeatherGateway(endpoints.weather, OPEN_WEATHER_API_KEY, makeHttpClient());
