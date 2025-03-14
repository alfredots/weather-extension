import { endpoints } from '@/infra/endpoints';
import { LocalStorageGateway } from '@/infra/gateways/local-storage.gateway';
import { WeatherRemoteGateway } from '@/infra/gateways/weather-remote.gateway';
import { OPEN_WEATHER_API_KEY } from '@/main/constants';
import { makeHttpClient } from '@/main/factories/http';

export const makeWeatherGateway = () => new WeatherRemoteGateway(endpoints.weather, OPEN_WEATHER_API_KEY, makeHttpClient());

export const makeLocalStorageGateway = () => new LocalStorageGateway();
