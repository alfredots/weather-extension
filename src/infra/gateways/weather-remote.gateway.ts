import { WeatherData } from '@/domain/entities/weather-data.entity';
import { DefaultError } from '@/domain/errors/default.error';
import { WeatherGateway } from '@/domain/gateways/weather-gateway.interface';
import { TemperatureScale } from '@/domain/utils/temperature-scale';
import { WeatherDataRemoteDto } from '@/infra/dto/weather-data-remote.dto';
import { HttpClient, HttpStatusCode } from '@/infra/http/http-client-contract';

function getWeatherIconSrc(iconCode: string) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export class WeatherRemoteGateway implements WeatherGateway {
  constructor(
    private readonly url: string,
    private readonly key: string,
    private readonly http: HttpClient
  ) {}

  async getWeatherData(city: string, scale: TemperatureScale = 'metric'): Promise<WeatherData> {
    const httpResponse = await this.http.request<WeatherDataRemoteDto>({
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
