import { makeLocalStorage } from 'shared/factories/cache/makeLocalStorage';
import { initialState } from './state';

export enum Actions {
  ADD_CITY = 'add-city'
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set(initialState);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const storage = makeLocalStorage();
    if (message.type === Actions.ADD_CITY) {
      storage.get(['cities']).then((items) => {
        if (items.cities.length > 0) {
          storage.set({ cities: [...items.cities, message.city] });
        } else {
          storage.set({ cities: [message.city] });
        }
      });
    }
  });
});
