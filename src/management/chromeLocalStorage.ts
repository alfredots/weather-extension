import { State } from 'zustand';
import { StorageValue } from 'zustand/middleware';

export const chromeLocalStorage = {
  async getItem(name: string): Promise<StorageValue<State>> {
    const promise = new Promise(function (resolve) {
      chrome.storage.local.get(name, (items) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          resolve(items[name]);
        }
      });
    });
    const result = await promise.then((value) => value as StorageValue<State>);
    console.log({ result });

    return result;
  },
  async setItem(
    name: string,
    storageValue: StorageValue<State>
  ): Promise<void> {
    console.log('setItem');

    const payload = { [name]: { ...storageValue } };
    chrome.storage.local.set(payload);
  },
  async removeItem(name: string): Promise<void> {
    console.log('removeItem');
    //chrome.storage.local.remove(name);
  }
};
