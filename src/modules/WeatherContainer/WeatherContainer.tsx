import * as S from './styles';
import { WeatherCard } from 'shared/components/WeatherCard';
import { useMemo } from 'react';
import { Grid, Box, InputBase, IconButton, Paper, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PictureInPicture as PictureInPictureIcon } from '@mui/icons-material';
import { useWeatherContainer } from '@/modules/WeatherContainer/hooks/use-weather-container';
import { makeGetWeatherData } from '@/main/use-cases';

export const WeatherContainer = () => {
  const getWeatherData = useMemo(() => makeGetWeatherData(), []);

  const {
    handleCityButtonClick,
    handleCityDeleteButtonClick,
    handleTempScaleButtonCLick,
    handleOverlayButtonClick,
    handleByBackground,
    options,
    cityInput,
    setCityInput,
    cities
  } = useWeatherContainer();

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
          <WeatherCard city={options.homeCity} tempScale={options.tempScale} getWeatherData={getWeatherData} />
        )}

        {cities?.map((city, index) => (
          <WeatherCard
            city={city}
            key={index}
            tempScale={options?.tempScale ?? 'metric'}
            getWeatherData={getWeatherData}
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
