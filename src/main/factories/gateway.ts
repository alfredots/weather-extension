import { WeatherGateway, WeatherGatewayImpl } from '@/application/gateways';
import { endpoints } from '@/infra/endpoints';
import { OPEN_WEATHER_API_KEY } from '@/main/constants';
import { makeHttpClient } from '@/main/factories/http';

export const makeWeatherGateway = (): WeatherGateway => new WeatherGatewayImpl(endpoints.weather, OPEN_WEATHER_API_KEY, makeHttpClient());
