import { OpenWeatherTempScale } from '@/application/dto/weather-data-dto';
import { IWeatherGateway } from '@/application/gateways';
import { WeatherData } from '@/domain/entities';
import { GetWeatherData } from '@/domain/use-cases/get-weather-data';

export class GetWeatherDataImpl implements GetWeatherData {
  constructor(private readonly weatherGateway: IWeatherGateway) {}

  async execute({ city, scale }: { city: string; scale: OpenWeatherTempScale }): Promise<WeatherData> {
    return await this.weatherGateway.getWeatherData(city, scale);
  }
}
