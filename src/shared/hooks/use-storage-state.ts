import { LocalStorageContent } from '@/application/contracts';
import { makeLocalStorage } from '@/main/factories/cache';
import { useEffect, useMemo, useState } from 'react';

export const useStorageState = <K extends keyof LocalStorageContent>(
  key: K
): [LocalStorageContent[K] | null, (val: LocalStorageContent[K]) => void] => {
  const [value, setValue] = useState<LocalStorageContent[K] | null>(null);
  const storage = useMemo(() => makeLocalStorage(), []);

  const setStateValue = (val: LocalStorageContent[K]) => {
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
