/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { chromeLocalStorage } from './chromeLocalStorage';

export enum Actions {
  GET_STATE = 'get-state',
  SET_STATE = 'set-state'
}
export type Action = `${Actions}`;

export type ExtensionState = State;

export type State = {
  counter: number;
  cities: string[];
};

type InnerActions = {
  updateStore: (payload: Partial<State>) => void;
};

export const state: State = {
  counter: 0,
  cities: ['Fortaleza']
};

export const storeName = 'storeState';
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
      name: storeName,
      storage: chromeLocalStorage
    }
  )
);
