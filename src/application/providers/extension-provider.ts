export interface IExtensionProvider {
  setBadgeText(text: string): void;
}

export class ExtensionProvider implements IExtensionProvider {
  setBadgeText(text: string) {
    chrome.action.setBadgeText({
      text
    });
  }
}
