/* eslint-disable @typescript-eslint/no-explicit-any */

import { AppState } from 'management/state';

type ArrayToObject<T extends (keyof AppState)[]> = {
  [K in T[number]]: AppState[K];
};

export interface LocalStorage {
  set(data: Partial<AppState>): Promise<void>;
  get<K extends keyof AppState>(key: K[]): Promise<ArrayToObject<K[]>>;
  remove(key: keyof AppState): void;
}
