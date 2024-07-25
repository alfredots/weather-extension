import { LocalStorageAdapter } from 'infra/adapters/LocalStorageAdapter';
import { LocalStorage } from 'infra/models/LocalStorage';

export const makeLocalStorage = (): LocalStorage => new LocalStorageAdapter();
