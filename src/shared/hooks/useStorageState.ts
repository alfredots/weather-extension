import { AppState, initialState } from 'management/state';
import { useEffect, useState } from 'react';
import { makeLocalStorage } from 'shared/factories/cache/makeLocalStorage';

export const useStorageState = <K extends keyof AppState>(key: K): [AppState[K], (val: AppState[K]) => void] => {
  const [value, setValue] = useState<AppState[K]>(initialState[key]);
  const storage = makeLocalStorage();

  const setStateValue = (val: AppState[K]) => {
    storage.set({
      [key]: val
    });
    setValue(val);
  };

  useEffect(() => {
    const listener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      setValue(changes[key].newValue);
    };

    chrome.storage.onChanged.addListener(listener);

    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, [key]);

  useEffect(() => {
    storage.get([key]).then((items) => {
      setValue(items[key]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, setStateValue];
};
