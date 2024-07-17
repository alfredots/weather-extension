import { ExtensionState, state, useStore } from '../../management/store';
import { useEffect, useLayoutEffect } from 'react';

export const useExtensionState = () => {
  const store = useStore();

  // useLayoutEffect(() => {
  //   chrome.storage.local.get(Object.keys(state), (res) => {
  //     store.updateStore(res);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   const listener = (changes: {
  //     [key: string]: chrome.storage.StorageChange;
  //   }) => {
  //     const newObj = Object.entries(changes).reduce(
  //       (acc, [key, { newValue }]) => {
  //         acc[key as keyof ExtensionState] = newValue;
  //         return acc;
  //       },
  //       {} as typeof state
  //     );
  //     store.updateStore(newObj);
  //   };

  //   chrome.storage.onChanged.addListener(listener);

  //   return () => {
  //     chrome.storage.onChanged.removeListener(listener);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return store;
};
