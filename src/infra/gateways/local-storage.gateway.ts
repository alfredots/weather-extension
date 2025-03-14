/* eslint-disable @typescript-eslint/no-explicit-any */
import { StorageContent } from '@/domain/entities/storage-content.entity';
import { StorageGateway } from '@/domain/gateways/storage-gateway.interface';

export class LocalStorageGateway implements StorageGateway {
  set(data: Partial<StorageContent>): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set(data, () => {
        resolve();
      });
    });
  }

  get<K extends keyof StorageContent>(key: K[]): Promise<{ [P in K]: StorageContent[P] }> {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (res) => {
        const result: { [P in K]: StorageContent[P] } = {} as any;
        key.forEach((k) => {
          result[k] = res[k];
        });
        resolve(result);
      });
    });
  }

  remove(key: keyof StorageContent): void {
    chrome.storage.local.remove(key);
  }
}
