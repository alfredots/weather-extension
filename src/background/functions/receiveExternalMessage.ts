import { state } from '../../management/store';

export const receiveExternalMessage = () => {
  chrome.runtime.onMessageExternal.addListener((request) => {
    Object.assign(state, { user: request });
    chrome.storage.local.set(state);
  });
};

receiveExternalMessage();
