import { IWeatherGateway } from '@/application/gateways';
import { IExtensionProvider } from '@/application/providers/extension-provider';
import { UpdateBadgeText } from '@/domain/use-cases/update-badge-text';
import { ILocalStorage } from '@/infra/cache/local-storage-contract';

export class UpdateBadgeTextImpl implements UpdateBadgeText {
  constructor(
    private readonly storage: ILocalStorage,
    private readonly weatherGateway: IWeatherGateway,
    private readonly extensionProvider: IExtensionProvider
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
