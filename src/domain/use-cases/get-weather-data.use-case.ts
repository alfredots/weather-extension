import { WeatherData } from '@/domain/entities/weather-data.entity';
import { WeatherGateway } from '@/domain/gateways/weather-gateway.interface';
import { TemperatureScale } from '@/domain/utils/temperature-scale';
import { UseCase } from '@/domain/utils/use-case';

export class GetWeatherData implements UseCase<{ city: string; scale: TemperatureScale }, Promise<WeatherData>> {
  constructor(private readonly weatherGateway: WeatherGateway) {}

  async execute({ city, scale }: { city: string; scale: TemperatureScale }): Promise<WeatherData> {
    return await this.weatherGateway.getWeatherData(city, scale);
  }
}
