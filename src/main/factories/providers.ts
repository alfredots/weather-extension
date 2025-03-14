import { ExtensionProvider } from '@/domain/providers/extension-provider.interface';

export class ExtensionChromeProvider implements ExtensionProvider {
  setBadgeText(text: string) {
    chrome.action.setBadgeText({
      text
    });
  }
}

export const makeExtensionProvider = () => new ExtensionChromeProvider();
