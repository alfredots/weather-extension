import { TemperatureScale } from '@/application/contracts';
import { WeatherData } from '@/domain/entities';
import { GetWeatherData } from '@/domain/use-cases/get-weather-data';
import { useAsyncReducer } from '@/shared/hooks/use-async-reducer';
import { useCallback, useEffect } from 'react';

export const useWeatherCard = (city: string, scale: TemperatureScale, getWeatherData: GetWeatherData) => {
  const [{ data: weatherData, ...rest }, dispatch] = useAsyncReducer<WeatherData | null>(null);

  const handleWeatherData = useCallback(async () => {
    try {
      dispatch({ type: 'FETCH_START' });
      const result = await getWeatherData.execute({
        city,
        scale
      });
      dispatch({ type: 'FETCH_SUCCESS', payload: result });
    } catch (_error) {
      dispatch({ type: 'FETCH_ERROR' });
    }
  }, [city, dispatch, getWeatherData, scale]);

  useEffect(() => {
    handleWeatherData();
  }, [handleWeatherData]);

  return {
    weatherData,
    ...rest
  };
};
