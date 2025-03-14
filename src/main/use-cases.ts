import { AddNewCity } from '@/domain/use-cases/add-new-city.use-case';
import { GetWeatherData } from '@/domain/use-cases/get-weather-data.use-case';
import { UpdateBadgeText } from '@/domain/use-cases/update-badge-text.use-case';
import { makeLocalStorageGateway, makeWeatherGateway } from '@/main/factories/gateway';
import { makeExtensionProvider } from '@/main/factories/providers';

export const makeGetWeatherData = () => new GetWeatherData(makeWeatherGateway());

export const makeAddNewCity = () => new AddNewCity(makeLocalStorageGateway());

export const makeUpdateBadgeText = () => new UpdateBadgeText(makeLocalStorageGateway(), makeWeatherGateway(), makeExtensionProvider());
