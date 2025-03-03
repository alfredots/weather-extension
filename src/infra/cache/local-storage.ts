/* eslint-disable @typescript-eslint/no-explicit-any */

import { ILocalStorage } from '@/infra/cache/local-storage-contract';

export class LocalStorageAdapter implements ILocalStorage {
  set(data: Partial<Storage>): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set(data, () => {
        resolve();
      });
    });
  }

  get<T>(keys: (keyof Storage)[]): Promise<T> {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, (res: any) => {
        resolve(res as T);
      });
    });
  }

  remove(key: string): void {
    chrome.storage.local.remove(key);
  }
}
