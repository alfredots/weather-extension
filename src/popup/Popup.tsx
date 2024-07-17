import { WeatherContainer } from 'modules/WeatherContainer';
import * as S from './styles';
import { useLayoutEffect } from 'react';

export const Popup = () => {
  useLayoutEffect(() => {
    chrome.runtime.sendMessage({ popupOpen: true });
  }, []);

  return (
    <S.Container>
      <WeatherContainer />
    </S.Container>
  );
};

export default Popup;
