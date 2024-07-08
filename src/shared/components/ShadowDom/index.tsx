import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheetManager } from 'styled-components';

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

  const [shadowRoot] = useState(() =>
    shadowHost.attachShadow({ mode: 'open' })
  );
  const [target, setTarget] = useState<HTMLElement>();

  const sectionRef = useRef<HTMLElement>(null);

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
      <section ref={sectionRef}>{children}</section>
    </StyleSheetManager>,
    shadowRoot
  );
};
