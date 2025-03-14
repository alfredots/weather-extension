import { StorageGateway } from '@/domain/gateways/storage-gateway.interface';
import { WeatherGateway } from '@/domain/gateways/weather-gateway.interface';
import { ExtensionProvider } from '@/domain/providers/extension-provider.interface';
import { UseCase } from '@/domain/utils/use-case';

export class UpdateBadgeText implements UseCase<void, Promise<void>> {
  constructor(
    private readonly storage: StorageGateway,
    private readonly weatherGateway: WeatherGateway,
    private readonly extensionProvider: ExtensionProvider
  ) {}

  async execute(): Promise<void> {
    const { options } = await this.storage.get(['options']);

    if (options === null) {
      throw new Error('As opções retornaram vazia');
    }

    const weatherData = await this.weatherGateway.getWeatherData(options.homeCity, options.tempScale);

    const temp = weatherData.temperature;
    const symbol = options.tempScale === 'metric' ? '\u2103' : '\u2109';

    this.extensionProvider.setBadgeText(`${Math.floor(temp)}${symbol}`);
  }
}
