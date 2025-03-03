import { LocalStorageAdapter } from '@/infra/cache';
import { ILocalStorage } from '@/infra/cache/local-storage-contract';

export const makeLocalStorage = (): ILocalStorage => new LocalStorageAdapter();
