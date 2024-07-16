import * as S from './styles';
import { WeatherCard } from './components/WeatherCard';
import { makeGetWeatherDataUseCase } from './functions/get-weather-data-factory';
import { useState } from 'react';
import { Grid, Box, InputBase, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useExtensionState } from 'shared/hooks/useExtensionState';
import { updateState } from 'management/store';

export const WeatherContainer = () => {
  const useCase = makeGetWeatherDataUseCase();
  const { cities } = useExtensionState();
  const [cityInput, setCityInput] = useState('');

  const handleCityButtonClick = () => {
    if (cityInput === '') {
      return;
    }

    updateState({
      cities: [...cities, cityInput]
    });
    setCityInput('');
  };

  const handleCityDeleteButtonClick = (index: number) => {
    const temp = [...cities];
    temp.splice(index, 1);

    updateState({
      cities: [...temp]
    });
  };

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
