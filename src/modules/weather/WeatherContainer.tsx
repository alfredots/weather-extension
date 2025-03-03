import { makeGetWeatherData } from '@/main/use-cases';
import { useWeatherModel } from '@/modules/weather/weather-model';
import { WeatherView } from '@/modules/weather/WeatherView';
import { useMemo } from 'react';

export const WeatherContainer = () => {
  const getWeatherData = useMemo(() => makeGetWeatherData(), []);
  const methods = useWeatherModel({ getWeatherData });

  return <WeatherView {...methods} />;
};
