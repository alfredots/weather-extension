import { AppState } from 'management/state';
import { useEffect, useMemo, useState } from 'react';
import { makeLocalStorage } from 'shared/factories/cache/makeLocalStorage';

export const useStorageState = <K extends keyof AppState>(key: K): [AppState[K] | null, (val: AppState[K]) => void] => {
  const [value, setValue] = useState<AppState[K] | null>(null);
  const storage = useMemo(makeLocalStorage, []);

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
  }, [key, storage]);

  return [value, setStateValue];
};
