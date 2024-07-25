/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalStorage } from 'infra/models/LocalStorage';
import { AppState } from 'management/state';

export class LocalStorageAdapter implements LocalStorage {
  set(data: any): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set(data, () => {
        resolve();
      });
    });
  }

  get<T = any>(keys: (keyof AppState)[]): Promise<T> {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, (res: any) => {
        resolve(res as T);
      });
    });
  }

  remove(key: keyof AppState): void {
    chrome.storage.local.remove(key);
  }
}
