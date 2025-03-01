import { AddNewCityImpl } from '@/application/use-cases/add-new-city-impl';
import { GetWeatherDataImpl } from '@/application/use-cases/get-weather-data-impl';
import { UpdateBadgeTextImpl } from '@/application/use-cases/update-badge-text-impl';
import { makeLocalStorage } from '@/main/factories/cache';
import { makeWeatherGateway } from '@/main/factories/gateway';
import { makeExtensionProvider } from '@/main/factories/providers';

export const makeGetWeatherData = () => new GetWeatherDataImpl(makeWeatherGateway());

export const makeAddNewCity = () => new AddNewCityImpl(makeLocalStorage());

export const makeUpdateBadgeText = () => new UpdateBadgeTextImpl(makeLocalStorage(), makeWeatherGateway(), makeExtensionProvider());
