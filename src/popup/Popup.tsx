import { WeatherContainer } from 'modules/WeatherContainer';
import * as S from './styles';

export const Popup = () => {
  console.log('popup');
  return (
    <S.Container>
      <WeatherContainer />
    </S.Container>
  );
};

export default Popup;
