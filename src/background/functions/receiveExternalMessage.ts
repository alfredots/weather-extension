export const receiveExternalMessage = () => {
  chrome.runtime.onMessageExternal.addListener((request) => {
    console.log('teste');
  });
};

receiveExternalMessage();
