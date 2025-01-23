import * as S from './styles';
import { WeatherCard } from 'shared/components/WeatherCard';
import { makeGetWeatherDataUseCase } from '../../shared/factories/use-cases/get-weather-data-factory';
import { useState } from 'react';
import { Grid, Box, InputBase, IconButton, Paper, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PictureInPicture as PictureInPictureIcon } from '@mui/icons-material';
import { Actions } from 'management/background';
import { useStorageState } from 'shared/hooks/useStorageState';
import { Messages } from 'shared/constants/messages';

export const WeatherContainer = () => {
  const useCase = makeGetWeatherDataUseCase();
  const [cityInput, setCityInput] = useState('');
  const [cities, setCities] = useStorageState('cities');
  const [options, setOptions] = useStorageState('options');

  const handleCityButtonClick = () => {
    if (cityInput === '' || cities === null) {
      return;
    }

    const updatedCities = [...cities, cityInput];

    setCities(updatedCities);
    setCityInput('');
  };

  const handleCityDeleteButtonClick = (index: number) => {
    if (!cities) {
      return;
    }

    cities.splice(index, 1);
    const updatedCities = [...cities];

    setCities(updatedCities);
  };

  const handleTempScaleButtonCLick = () => {
    if (!options) {
      return;
    }

    setOptions({
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric'
    });
  };

  const handleOverlayButtonClick = () => {
    chrome.tabs.query(
      {
        active: true
      },
      (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id || -1, Messages.TOGGLE_OVERLAY);
        }
      }
    );
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
                  Add by Bg
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <Box padding="8px">
                <IconButton onClick={handleTempScaleButtonCLick}>{options?.tempScale === 'metric' ? '\u2103' : '\u2109'}</IconButton>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <Box padding="8px">
                <IconButton onClick={handleOverlayButtonClick}>
                  <PictureInPictureIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {options !== null && options?.homeCity != '' && (
          <WeatherCard city={options.homeCity} tempScale={options.tempScale} getWeatherData={useCase.getWeatherData} />
        )}

        {cities?.map((city, index) => (
          <WeatherCard
            city={city}
            key={index}
            tempScale={options?.tempScale ?? 'metric'}
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
