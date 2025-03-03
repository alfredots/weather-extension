import { ExtensionProvider, IExtensionProvider } from '@/application/providers/extension-provider';

export const makeExtensionProvider = (): IExtensionProvider => new ExtensionProvider();
