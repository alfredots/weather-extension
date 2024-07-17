import * as S from './styles';
import { WeatherCard } from './components/WeatherCard';
import { makeGetWeatherDataUseCase } from './functions/get-weather-data-factory';
import { useEffect, useState } from 'react';
import { Grid, Box, InputBase, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useStore } from 'management/store';

export const WeatherContainer = () => {
  const useCase = makeGetWeatherDataUseCase();
  const { cities, updateStore } = useStore();
  const [cityInput, setCityInput] = useState('');

  const handleCityButtonClick = () => {
    if (cityInput === '') {
      return;
    }

    updateStore({
      cities: [...cities, cityInput]
    });

    setCityInput('');
  };

  const handleCityDeleteButtonClick = (index: number) => {
    const temp = [...cities];
    temp.splice(index, 1);

    updateStore({
      cities: [...temp]
    });
  };

  useEffect(() => {
    console.log(cities.toString());
  }, [cities]);

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
