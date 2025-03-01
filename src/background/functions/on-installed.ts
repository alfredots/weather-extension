import { Actions } from '@/main/enums';
import { makeAddNewCity, makeUpdateBadgeText } from '@/main/use-cases';
import { initialState } from 'management/state';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set(initialState);

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === Actions.ADD_CITY) {
      const addNewCity = makeAddNewCity();
      (async () => {
        try {
          await addNewCity.execute({
            city: message.city
          });
        } catch (error) {
          console.error(error);
        }
      })();
    }
  });

  chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Add city to weather extension',
    id: 'weatherExtension'
  });

  chrome.alarms.create({
    periodInMinutes: 1 / 6
  });
});

chrome.contextMenus.onClicked.addListener((event) => {
  const addNewCity = makeAddNewCity();
  (async () => {
    try {
      if (event.selectionText === undefined) {
        return;
      }

      await addNewCity.execute({
        city: event.selectionText
      });
    } catch (error) {
      console.error(error);
    }
  })();
});

chrome.alarms.onAlarm.addListener(() => {
  const updateBadgeText = makeUpdateBadgeText();
  (async () => {
    try {
      await updateBadgeText.execute();
    } catch (error) {
      console.error();
    }
  })();
});
