import { WeatherData } from 'domain/entities/WeatherData';
import { Actions } from 'management/background';
import { initialState } from 'management/state';
import { getStoredCities, getStoredOptions, setStoredCities } from 'modules/WeatherContainer/functions/storage';
import { makeLocalStorage } from 'shared/factories/cache/makeLocalStorage';
import { makeGetWeatherDataUseCase } from 'shared/factories/use-cases/get-weather-data-factory';

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
  getStoredCities().then((cities) => {
    if (event.selectionText) {
      setStoredCities([...cities, event.selectionText]);
    }
  });
});

chrome.alarms.onAlarm.addListener(() => {
  getStoredOptions().then((options) => {
    if (options === null) {
      return;
    }

    const { getWeatherData } = makeGetWeatherDataUseCase();

    getWeatherData.execute({ city: options.homeCity || '', scale: options?.tempScale || 'metric' }).then((data) => {
      const weatherData = data as WeatherData;
      const temp = weatherData.temperature;
      const symbol = options.tempScale === 'metric' ? '\u2103' : '\u2109';

      chrome.action.setBadgeText({
        text: `${Math.floor(temp)}${symbol}`
      });
    });
  });
});
