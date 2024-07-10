import { ReactNode, useEffect, useState } from 'react';
import { Typography, Card, CardContent, Box } from '@mui/material';
import { GetWeatherData } from 'domain/use-cases/get-weather-data';
import { WeatherData } from 'domain/entities/WeatherData';

type WeatherCardProps = {
  city: string;
  getWeatherData: GetWeatherData;
};

type WeatherCardState = 'loading' | 'ready' | 'error';

const WeatherCardContainer = ({ children }: { children: ReactNode }) => (
  <Box mx="4px" my="16px">
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  </Box>
);

export const WeatherCard = ({ city, getWeatherData }: WeatherCardProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>('loading');

  useEffect(() => {
    const init = async () => {
      try {
        const result = await getWeatherData.execute(city);
        setWeatherData(result as WeatherData);
        setCardState('ready');
      } catch (_error) {
        setCardState('error');
      }
    };
    init();
  }, [getWeatherData, city]);

  if (cardState === 'loading' || weatherData === null)
    return (
      <WeatherCardContainer>
        <Typography variant="body1">Loading...</Typography>
      </WeatherCardContainer>
    );

  if (cardState === 'error')
    return (
      <WeatherCardContainer>
        <Typography variant="body1">
          Error: could not retrieve weather data for this city.
        </Typography>
      </WeatherCardContainer>
    );

  return (
    <WeatherCardContainer>
      <Typography variant="h5">{weatherData.city}</Typography>
      <Typography variant="body1">
        temperature: {Math.round(weatherData.temperature)}
      </Typography>
      <Typography variant="body1">
        Feels like: {Math.round(weatherData.feelsLike)}
      </Typography>
    </WeatherCardContainer>
  );
};
