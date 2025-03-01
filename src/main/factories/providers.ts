import { ExtensionProvider, ExtensionProviderImpl } from '@/application/providers/extension-provider';

export const makeExtensionProvider = (): ExtensionProvider => new ExtensionProviderImpl();
