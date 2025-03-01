import { DataStorageContent } from '@/application/contracts';
import { makeLocalStorage } from '@/main/factories/cache';
import { useEffect, useMemo, useState } from 'react';

export const useStorageState = <K extends keyof DataStorageContent>(key: K): [DataStorageContent[K] | null, (val: DataStorageContent[K]) => void] => {
  const [value, setValue] = useState<DataStorageContent[K] | null>(null);
  const storage = useMemo(() => makeLocalStorage(), []);

  const setStateValue = (val: DataStorageContent[K]) => {
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
