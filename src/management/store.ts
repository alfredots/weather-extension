/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist, StorageValue, createJSONStorage } from 'zustand/middleware';

export enum Actions {
  GET_STATE = 'get-state',
  SET_STATE = 'set-state'
}
export type Action = `${Actions}`;

export type ExtensionState = State;

export const updateState = (payload: Partial<State>) => {
  chrome.runtime.sendMessage({ type: Actions.SET_STATE, payload });
};

type State = {
  counter: 0;
  cities: string[];
};

type InnerActions = {
  updateStore: (payload: Partial<State>) => void;
};

export const state: State = {
  counter: 0,
  cities: ['Fortaleza']
};

export const useStore = create<State & InnerActions>()(
  persist(
    (set) => ({
      ...state,
      updateStore: (payload) => {
        set((state) => ({
          ...state,
          ...payload
        }));
      }
    }),
    {
      name: 'store-state',
      storage: {
        async getItem(name: string): Promise<StorageValue<State>> {
          const promise = new Promise(function (resolve, reject) {
            chrome.storage.local.get(name, function (items) {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                reject(chrome.runtime.lastError.message);
              } else {
                console.log(items[name]);
                resolve(items[name]);
              }
            });
          });
          const result = await promise.then(
            (value) => value as StorageValue<State>
          );
          console.log('getItem');
          console.log({ name, result });

          return result;
        },
        async setItem(
          name: string,
          storageValue: StorageValue<State>
        ): Promise<void> {
          const value = { [name]: { ...storageValue } };
          console.log('setItem');
          console.log({ name, storageValue, value });
          //chrome.storage.local.remove(name);
          chrome.storage.local.set(value);
        },
        async removeItem(name: string): Promise<void> {
          chrome.storage.local.remove(name);
        }
      }
    }
  )
);
