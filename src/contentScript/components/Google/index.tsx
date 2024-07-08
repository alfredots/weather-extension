import React from 'react';

import { ShadowDom } from '../../../shared/components/ShadowDom';
import * as S from './styles';

export function Google(): React.ReactElement | null {
  const [parentElement] = React.useState(() => document.querySelector('body'));

  return parentElement ? (
    <ShadowDom parentElement={parentElement}>
      <S.Container>Hello Dev 👋,</S.Container>
    </ShadowDom>
  ) : null;
}
