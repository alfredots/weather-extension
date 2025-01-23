import { ReactNode, useEffect, useState } from 'react';
import { Typography, Card, CardContent, Box, CardActions, Button, Grid } from '@mui/material';
import { GetWeatherData } from 'domain/use-cases/get-weather-data';
import { WeatherData } from 'domain/entities/WeatherData';
import { OpenWeatherTempScale } from 'domain/external/OpenWeatherData';
import './WeatherCard.css';

type WeatherCardProps = {
  city: string;
  tempScale: OpenWeatherTempScale;
  onDelete?: () => void;
  getWeatherData: GetWeatherData;
};

type WeatherCardState = 'loading' | 'ready' | 'error';

const WeatherCardContainer = ({ children, onDelete }: { children: ReactNode; onDelete?: () => void }) => (
  <Box mx="4px" my="16px">
    <Card>
      <CardContent>{children}</CardContent>
      <CardActions>
        {onDelete && (
          <Button color="error" onClick={onDelete}>
            <Typography className="weatherCard-body">Delete</Typography>
          </Button>
        )}
      </CardActions>
    </Card>
  </Box>
);

export const WeatherCard = ({ city, tempScale, onDelete, getWeatherData }: WeatherCardProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>('loading');

  useEffect(() => {
    const init = async () => {
      try {
        const result = await getWeatherData.execute({
          city,
          scale: tempScale
        });
        setWeatherData(result as WeatherData);
        setCardState('ready');
      } catch (_error) {
        setCardState('error');
      }
    };
    init();
  }, [getWeatherData, city, tempScale]);

  if (cardState === 'loading' || weatherData === null) {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weatherCard-title">{weatherData?.city}</Typography>
        <Typography className="weatherCard-body">Loading...</Typography>
      </WeatherCardContainer>
    );
  }

  if (cardState === 'error') {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weatherCard-body">Error: could not retrieve weather data for this city.</Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Grid container justifyContent="space-around">
        <Grid item>
          <Typography className="weatherCard-title">{weatherData.city}</Typography>
          <Typography className="weatherCard-temp">{Math.round(weatherData.temperature)}</Typography>
          <Typography className="weatherCard-body">Feels like {Math.round(weatherData.feelsLike)}</Typography>
        </Grid>
        <Grid item>
          {weatherData.weatherIconUrl && <img src={weatherData.weatherIconUrl} alt="" />}
          {weatherData.weatherDescription && <Typography className="weatherCard-body">{weatherData.weatherDescription}</Typography>}
        </Grid>
      </Grid>
    </WeatherCardContainer>
  );
};
