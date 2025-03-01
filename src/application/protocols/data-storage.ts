/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataStorageContent } from '@/application/contracts';

type ArrayToObject<T extends (keyof DataStorageContent)[]> = {
  [K in T[number]]: DataStorageContent[K];
};

export interface DataStorage {
  set(data: Partial<DataStorageContent>): Promise<void>;
  get<K extends keyof DataStorageContent>(key: K[]): Promise<ArrayToObject<K[]>>;
  remove(key: keyof DataStorageContent): void;
}
