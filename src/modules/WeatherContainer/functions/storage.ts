import { AppState } from 'management/state';

export type LocalStorage = Partial<AppState>;

export type LocalStorageKeys = keyof LocalStorage;

export function setStoredCities(cities: string[]): Promise<void> {
  const vals: LocalStorage = {
    cities
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ['cities'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.cities ?? []);
    });
  });
}

export function getStoredOptions(): Promise<AppState['options'] | null> {
  const keys: LocalStorageKeys[] = ['options'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.options ?? null);
    });
  });
}
