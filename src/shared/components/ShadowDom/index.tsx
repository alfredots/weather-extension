import createTheme from '@mui/material/styles/createTheme';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheetManager } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';

export const ShadowDom = ({
  parentElement,
  position = 'beforebegin',
  children
}: {
  parentElement: Element;
  position?: InsertPosition;
  children: React.ReactNode;
}) => {
  const [shadowHost] = useState(() => document.createElement('my-shadow-host'));

  const [shadowRoot] = useState(() => shadowHost.attachShadow({ mode: 'open' }));
  const [target, setTarget] = useState<HTMLElement>();

  const sectionRef = useRef<HTMLElement>(null);

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

  useLayoutEffect(() => {
    if (parentElement) {
      parentElement.insertAdjacentElement(position, shadowHost);
    }

    return () => {
      shadowHost.remove();
    };
  }, [parentElement, shadowHost, position]);

  useEffect(() => {
    if (sectionRef.current) {
      setTarget(sectionRef.current);
    }
  }, []);

  return ReactDOM.createPortal(
    <StyleSheetManager target={target}>
      <CacheProvider value={cache}>
        <StyledEngineProvider>
          <ThemeProvider theme={theme}>
            <section ref={sectionRef}>{children}</section>
          </ThemeProvider>
        </StyledEngineProvider>
      </CacheProvider>
    </StyleSheetManager>,
    shadowRoot
  );
};
