import createTheme from '@mui/material/styles/createTheme';
import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';

export const ShadowDom = ({ id, children }: { id: string; children: ReactNode }) => {
  const [parentElement] = useState(() => document.querySelector('body'));
  const [shadowHost] = useState(() => document.createElement(id));
  shadowHost.id = id;

  const [shadowRoot] = useState(() => shadowHost.attachShadow({ mode: 'closed' }));

  const theme = createTheme({
    components: {
      MuiPopover: {
        defaultProps: {
          container: shadowHost
        }
      },
      MuiPopper: {
        defaultProps: {
          container: shadowHost
        }
      },
      MuiModal: {
        defaultProps: {
          container: shadowHost
        }
      }
    }
  });

  const cache = createCache({
    key: 'css',
    prepend: true,
    container: shadowRoot
  });

  useEffect(() => {
    if (parentElement) {
      parentElement.appendChild(shadowHost);
    }

    return () => {
      shadowHost.remove();
    };
  }, [parentElement, shadowHost]);

  return ReactDOM.createPortal(
    <CacheProvider value={cache}>
      <StyledEngineProvider>
        <ThemeProvider theme={theme}>
          <section>{children}</section>
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>,
    shadowRoot
  );
};
