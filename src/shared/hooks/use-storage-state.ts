import { StorageContent } from '@/domain/entities/storage-content.entity';
import { makeLocalStorageGateway } from '@/main/factories/gateway';
import { useEffect, useMemo, useState } from 'react';

export const useStorageState = <K extends keyof StorageContent>(key: K): [StorageContent[K] | null, (val: StorageContent[K]) => void] => {
  const [value, setValue] = useState<StorageContent[K] | null>(null);
  const storage = useMemo(() => makeLocalStorageGateway(), []);

  const setStateValue = (val: StorageContent[K]) => {
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
