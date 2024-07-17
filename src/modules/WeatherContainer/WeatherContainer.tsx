import * as S from './styles';
import { WeatherCard } from './components/WeatherCard';
import { makeGetWeatherDataUseCase } from './functions/get-weather-data-factory';
import { useEffect, useState } from 'react';
import { Grid, Box, InputBase, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getStoredCities, setStoredCities } from './functions/storage';

export const WeatherContainer = () => {
  const useCase = makeGetWeatherDataUseCase();
  const [cityInput, setCityInput] = useState('');
  const [cities, setCities] = useState<string[]>([]);

  const handleCityButtonClick = () => {
    if (cityInput === '') {
      return;
    }

    const updatedCities = [...cities, cityInput];

    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput('');
    });
  };

  const handleCityDeleteButtonClick = (index: number) => {
    const updatedCities = cities.splice(index, 1);

    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
  }, []);

  return (
    <S.Container>
      <Box mx="8px" my="16px">
        <Grid container>
          <Grid item>
            <Paper>
              <Box px="15px" py="5px">
                <InputBase
                  placeholder="Add a city name"
                  value={cityInput}
                  onChange={(event) => setCityInput(event.target.value)}
                />
                <IconButton onClick={handleCityButtonClick}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {cities.map((city, index) => (
          <WeatherCard
            city={city}
            key={index}
            getWeatherData={useCase.getWeatherData}
            onDelete={() => {
              handleCityDeleteButtonClick(index);
            }}
          />
        ))}
        <Box height="16px" />
      </Box>
    </S.Container>
  );
};
