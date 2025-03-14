import { WeatherData } from '@/domain/entities/weather-data.entity';
import { TemperatureScale } from '@/domain/utils/temperature-scale';

export interface WeatherGateway {
  getWeatherData(city: string, scale: TemperatureScale): Promise<WeatherData>;
}
