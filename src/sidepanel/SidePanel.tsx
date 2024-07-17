import { UsersContainer } from '../modules/UsersContainer';
import * as S from './styles';

export const SidePanel = () => {
  const link = 'https://github.com/guocaoyi/create-chrome-ext';

  return (
    <S.Container>
      <h3>SidePanel Page</h3>
      <UsersContainer />
    </S.Container>
  );
};

export default SidePanel;
