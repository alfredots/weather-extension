import { useSnapshot } from 'valtio';
import { Actions, ExtensionState, state } from '../../management/store';
import { useEffect } from 'react';

export const useExtensionState = () => {
  const extensionState = useSnapshot(state);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: Actions.GET_STATE }, (response) => {
      Object.assign(state, response);
    });
    const listener = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      Object.assign(
        state,
        Object.entries(changes).reduce(
          (acc, [key, { newValue }]) => {
            acc[key as keyof ExtensionState] = newValue;
            return acc;
          },
          {} as typeof state
        )
      );
    };

    chrome.storage.onChanged.addListener(listener);

    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);

  return extensionState;
};
