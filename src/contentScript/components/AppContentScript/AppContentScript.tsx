import { useEffect, useMemo, useState } from 'react';
import { ShadowDom } from 'shared/components/ShadowDom';
import { WeatherCard } from 'shared/components/WeatherCard';

import { useStorageState } from '@/shared/hooks/use-storage-state';
import { Messages } from '@/main/enums';
import { makeGetWeatherData } from '@/main/use-cases';

export const AppContentScript = () => {
  const getWeatherData = useMemo(() => makeGetWeatherData(), []);
  const [isActive, setIsActive] = useState(false);
  const [parentElement] = useState(() => document.querySelector('body'));
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

  return isActive && parentElement && options?.homeCity ? (
    <ShadowDom id="overlay-content">
      <div style={{ position: 'fixed', left: '5%', top: '15%', maxWidth: '240px', maxHeight: '240px', backgroundColor: '#f5f5f5' }}>
        <WeatherCard
          city={options.homeCity}
          tempScale={options.tempScale}
          getWeatherData={getWeatherData}
          onDelete={() => setIsActive(false)}
          isModal={true}
        />
      </div>
    </ShadowDom>
  ) : null;
};
