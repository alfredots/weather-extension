import { ReactNode, useEffect, useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
  CardActions,
  Button
} from '@mui/material';
import { GetWeatherData } from 'domain/use-cases/get-weather-data';
import { WeatherData } from 'domain/entities/WeatherData';

type WeatherCardProps = {
  city: string;
  onDelete?: () => void;
  getWeatherData: GetWeatherData;
};

type WeatherCardState = 'loading' | 'ready' | 'error';

const WeatherCardContainer = ({
  children,
  onDelete
}: {
  children: ReactNode;
  onDelete?: () => void;
}) => (
  <Box mx="4px" my="16px">
    <Card>
      <CardContent>{children}</CardContent>
      <CardActions>
        {onDelete && (
          <Button color="error" onClick={onDelete}>
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  </Box>
);

export const WeatherCard = ({
  city,
  onDelete,
  getWeatherData
}: WeatherCardProps) => {
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
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="body1">Loading...</Typography>
      </WeatherCardContainer>
    );

  if (cardState === 'error')
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="body1">
          Error: could not retrieve weather data for this city.
        </Typography>
      </WeatherCardContainer>
    );

  return (
    <WeatherCardContainer onDelete={onDelete}>
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
