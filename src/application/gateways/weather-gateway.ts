import { TemperatureScale } from '@/application/contracts';
import { WeatherDataDto } from '@/application/dto/weather-data-dto';
import { WeatherData } from '@/domain/entities';
import { DefaultError } from '@/domain/errors/DefaultError';
import { HttpStatusCode, IHttpClient } from '@/infra/http/http-client-contract';

export interface IWeatherGateway {
  getWeatherData(city: string, scale: TemperatureScale): Promise<WeatherData>;
}

function getWeatherIconSrc(iconCode: string) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export class WeatherGateway implements IWeatherGateway {
  constructor(
    private readonly url: string,
    private readonly key: string,
    private readonly http: IHttpClient
  ) {}

  async getWeatherData(city: string, scale: TemperatureScale = 'metric'): Promise<WeatherData> {
    const httpResponse = await this.http.request<WeatherDataDto>({
      url: `${this.url}?q=${city}&units=${scale}&appid=${this.key}`,
      method: 'get'
    });

    if (httpResponse.body === undefined) {
      throw new DefaultError();
    }

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const openWeatherData = httpResponse.body;
        return {
          city: openWeatherData.name,
          temperature: openWeatherData.main.temp || 0,
          feelsLike: openWeatherData.main.feels_like,
          weatherIconUrl: openWeatherData.weather.length > 0 ? getWeatherIconSrc(openWeatherData.weather[0].icon) : '',
          weatherDescription: openWeatherData.weather.length > 0 ? openWeatherData.weather[0].description : ''
        };
      default:
        throw new DefaultError();
    }
  }
}
