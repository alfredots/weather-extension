import { GetWeatherData } from '@/domain/use-cases/get-weather-data.use-case';
import { Messages, Actions } from '@/main/enums';
import { useStorageState } from '@/shared/hooks/use-storage-state';
import { useState } from 'react';

type UseWeatherModelProps = {
  getWeatherData: GetWeatherData;
};

export const useWeatherModel = ({ getWeatherData }: UseWeatherModelProps) => {
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

  return {
    handleCityButtonClick,
    handleCityDeleteButtonClick,
    handleTempScaleButtonCLick,
    handleOverlayButtonClick,
    handleByBackground,
    options,
    cityInput,
    setCityInput,
    cities,
    getWeatherData
  };
};
