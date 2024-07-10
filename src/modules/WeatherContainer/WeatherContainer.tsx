import { makeWeatherGateway } from './functions/weather-gateway-factory';
import * as S from './styles';
import { WeatherCard } from './components/WeatherCard';
import { makeGetWeatherDataUseCase } from './functions/get-weather-data-factory';

export const WeatherContainer = () => {
  const gateway = makeWeatherGateway();
  const useCase = makeGetWeatherDataUseCase(gateway);

  return (
    <S.Container>
      <WeatherCard city="Fortaleza" getWeatherData={useCase.getWeatherData} />
      <WeatherCard city="São Paulo" getWeatherData={useCase.getWeatherData} />
      <WeatherCard city="São Luís" getWeatherData={useCase.getWeatherData} />
      <WeatherCard city="Curitiba" getWeatherData={useCase.getWeatherData} />
    </S.Container>
  );
};
