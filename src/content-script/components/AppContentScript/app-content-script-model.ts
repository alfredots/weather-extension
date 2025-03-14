import { GetWeatherData } from '@/domain/use-cases/get-weather-data.use-case';
import { Messages } from '@/main/enums';
import { useStorageState } from '@/shared/hooks/use-storage-state';
import { useState, useEffect } from 'react';

type UseAppContentScriptModelProps = {
  getWeatherData: GetWeatherData;
};

export const useAppContentScriptModel = ({ getWeatherData }: UseAppContentScriptModelProps) => {
  const [isActive, setIsActive] = useState(false);
  const [options] = useStorageState('options');

  useEffect(() => {
    if (options?.hasAutoOverlay) {
      setIsActive(options?.hasAutoOverlay);
    }
  }, [options?.hasAutoOverlay]);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg === Messages.TOGGLE_OVERLAY) {
        setIsActive(!isActive);
      }
    });
  }, [isActive]);

  return {
    isActive,
    setIsActive,
    options,
    getWeatherData
  };
};
