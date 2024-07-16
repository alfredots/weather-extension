import { useExtensionState } from '../shared/hooks/useExtensionState';
import { UsersContainer } from '../modules/UsersContainer';
import * as S from './styles';

export const SidePanel = () => {
  const state = useExtensionState();
  const link = 'https://github.com/guocaoyi/create-chrome-ext';

  return (
    <S.Container>
      <h3>SidePanel Page</h3>
      <p>{JSON.stringify(state.cities)}</p>
      <UsersContainer />
    </S.Container>
  );
};

export default SidePanel;
