import { WeatherData } from '@/domain/entities/weather-data.entity';
import { GetWeatherData } from '@/domain/use-cases/get-weather-data.use-case';
import { TemperatureScale } from '@/domain/utils/temperature-scale';
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
