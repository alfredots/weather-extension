import { useEffect, useState } from 'react';
import { ShadowDom } from 'shared/components/ShadowDom';
import { WeatherCard } from 'shared/components/WeatherCard';
import { makeGetWeatherDataUseCase } from 'shared/factories/use-cases/get-weather-data-factory';
import * as S from './styles';
import { useStorageState } from 'shared/hooks/useStorageState';
import { Messages } from 'shared/constants/messages';

export const AppContentScript = () => {
  const useCase = makeGetWeatherDataUseCase();
  const [isActive, setIsActive] = useState(false);
  const [parentElement] = useState(() => document.querySelector('body'));
  const [options] = useStorageState('options');
  console.log(options);

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

  return isActive && parentElement && options?.homeCity ? (
    <ShadowDom parentElement={parentElement}>
      <S.OverlayCard>
        <WeatherCard
          city={options.homeCity}
          tempScale={options.tempScale}
          getWeatherData={useCase.getWeatherData}
          onDelete={() => setIsActive(false)}
        />
      </S.OverlayCard>
    </ShadowDom>
  ) : null;
};
