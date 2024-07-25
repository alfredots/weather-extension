import * as S from './styles';
import { WeatherCard } from './components/WeatherCard';
import { makeGetWeatherDataUseCase } from './functions/get-weather-data-factory';
import { useState } from 'react';
import { Grid, Box, InputBase, IconButton, Paper, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Actions } from 'management/background';
import { useStorageState } from 'shared/hooks/useStorageState';

export const WeatherContainer = () => {
  const useCase = makeGetWeatherDataUseCase();
  const [cityInput, setCityInput] = useState('');
  const [cities, setCities] = useStorageState('cities');
  const [options, setOptions] = useStorageState('options');

  const handleCityButtonClick = () => {
    if (cityInput === '') {
      return;
    }

    const updatedCities = [...cities, cityInput];

    setCities(updatedCities);
    setCityInput('');
  };

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1);
    const updatedCities = [...cities];

    setCities(updatedCities);
  };

  const handleTempScaleButtonCLick = () => {
    setOptions({
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric'
    });
  };

  const handleByBackground = () => {
    if (cityInput === '') {
      return;
    }

    chrome.runtime.sendMessage({ type: Actions.ADD_CITY, city: cityInput }, () => {
      console.log('mensagem enviada');
    });
  };

  return (
    <S.Container>
      <Box mx="8px" my="16px">
        <Grid container gap="4px" justifyContent="space-evenly">
          <Grid item>
            <Paper>
              <Box px="15px" py="5px">
                <InputBase placeholder="Add a city name" value={cityInput} onChange={(event) => setCityInput(event.target.value)} />
                <IconButton onClick={handleCityButtonClick}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <Box padding="12px">
                <Button color="secondary" onClick={handleByBackground}>
                  Add by background
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <Box padding="8px">
                <IconButton onClick={handleTempScaleButtonCLick}>{options.tempScale === 'metric' ? '\u2103' : '\u2109'}</IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {cities.map((city, index) => (
          <WeatherCard
            city={city}
            key={index}
            tempScale={options.tempScale}
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
