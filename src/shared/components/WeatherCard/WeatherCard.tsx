import { ReactNode } from 'react';
import { Typography, Card, CardContent, Box, CardActions, Button, Grid } from '@mui/material';
import { GetWeatherData } from 'domain/use-cases/get-weather-data';
import { OpenWeatherTempScale } from '@/application/dto/weather-data-dto';
import { useWeatherCard } from '@/shared/components/WeatherCard/use-weather-card';
import './WeatherCard.css';

type WeatherCardProps = {
  city: string;
  tempScale: OpenWeatherTempScale;
  onDelete?: () => void;
  getWeatherData: GetWeatherData;
  isModal?: boolean;
};

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

export const WeatherCard = ({ city, tempScale, onDelete, getWeatherData, isModal = false }: WeatherCardProps) => {
  const { weatherData, isError, isLoading } = useWeatherCard(city, tempScale, getWeatherData);

  if (isLoading || weatherData === null) {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weatherCard-title">{weatherData?.city}</Typography>
        <Typography className="weatherCard-body">Loading...</Typography>
      </WeatherCardContainer>
    );
  }

  if (isError) {
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
          {!isModal && weatherData.weatherIconUrl && <img src={weatherData.weatherIconUrl} alt="" />}
          {weatherData.weatherDescription && <Typography className="weatherCard-body">{weatherData.weatherDescription}</Typography>}
        </Grid>
      </Grid>
    </WeatherCardContainer>
  );
};
