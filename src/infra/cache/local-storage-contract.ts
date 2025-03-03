/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalStorageContent } from '@/application/contracts';

type ArrayToObject<T extends (keyof LocalStorageContent)[]> = {
  [K in T[number]]: LocalStorageContent[K];
};

export interface ILocalStorage {
  set(data: Partial<LocalStorageContent>): Promise<void>;
  get<K extends keyof LocalStorageContent>(key: K[]): Promise<ArrayToObject<K[]>>;
  remove(key: keyof LocalStorageContent): void;
}
