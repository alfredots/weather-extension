import { DataStorage } from '@/application/protocols';
import { LocalStorageAdapter } from '@/infra/cache';

export const makeLocalStorage = (): DataStorage => new LocalStorageAdapter();
