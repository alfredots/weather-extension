export interface ExtensionProvider {
  setBadgeText(text: string): void;
}

export class ExtensionProviderImpl implements ExtensionProvider {
  setBadgeText(text: string) {
    chrome.action.setBadgeText({
      text
    });
  }
}
