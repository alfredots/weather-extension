import { create } from 'zustand';

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
  cities: []
};

export const useStore = create<State & InnerActions>()((set) => ({
  ...state,
  updateStore: (payload) => {
    set((state) => ({
      ...state,
      ...payload
    }));
  }
}));
