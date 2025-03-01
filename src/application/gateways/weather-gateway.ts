import { OpenWeatherTempScale, OpenWeatherData } from '@/application/dto/open-weather-data';
import { HttpClient, HttpStatusCode } from '@/application/protocols';
import { WeatherData } from '@/domain/entities';
import { DefaultError } from '@/domain/errors/DefaultError';

export interface WeatherGateway {
  getWeatherData(city: string, scale: OpenWeatherTempScale): Promise<WeatherData>;
}

function getWeatherIconSrc(iconCode: string) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export class WeatherGatewayImpl implements WeatherGateway {
  constructor(
    private readonly url: string,
    private readonly key: string,
    private readonly http: HttpClient
  ) {}

  async getWeatherData(city: string, scale: OpenWeatherTempScale = 'metric'): Promise<WeatherData> {
    const httpResponse = await this.http.request<OpenWeatherData>({
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
