import { proxy } from 'valtio';

export enum Actions {
  GET_STATE = 'get-state',
  SET_STATE = 'set-state'
}
export type Action = `${Actions}`;

export const state = proxy({
  counter: 0,
  user: {
    token: '',
    user: '',
    password: ''
  }
});

export type ExtensionState = typeof state;

export const updateState = (payload: Partial<typeof state>) => {
  chrome.runtime.sendMessage({ type: Actions.SET_STATE, payload });
};
