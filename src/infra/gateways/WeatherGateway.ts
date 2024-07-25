import { WeatherData } from 'domain/entities/WeatherData';
import { DefaultError } from 'domain/errors/DefaultError';
import { OpenWeatherData, OpenWeatherTempScale } from 'domain/external/OpenWeatherData';
import { WeatherRepository } from 'domain/repositories/WeatherRepository';
import { HttpClient } from 'infra/adapters/HttpClient';
import { HttpStatusCode } from 'infra/models/HttpResponse';
import { OPEN_WEATHER_API_KEY } from 'shared/constants/api';

export class WeatherGateway implements WeatherRepository {
  constructor(private http: HttpClient) {}

  async getWeatherData(city: string, scale: OpenWeatherTempScale = 'metric'): Promise<WeatherData | DefaultError> {
    const httpResponse = await this.http.request({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${scale}&appid=${OPEN_WEATHER_API_KEY}`,
      method: 'get'
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        const openWeatherData = httpResponse.body as OpenWeatherData;
        return {
          city: openWeatherData.name,
          temperature: openWeatherData.main.temp || 0,
          feelsLike: openWeatherData.main.feels_like
        };
      default:
        return {
          message: httpResponse.body?.message
        };
    }
  }
}
