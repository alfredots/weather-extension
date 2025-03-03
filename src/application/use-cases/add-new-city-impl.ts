import { AddNewCity } from '@/domain/use-cases/add-new-city';
import { ILocalStorage } from '@/infra/cache/local-storage-contract';

export class AddNewCityImpl implements AddNewCity {
  constructor(private readonly localStorage: ILocalStorage) {}

  async execute(param: { city: string }): Promise<void> {
    const { cities } = await this.localStorage.get(['cities']);

    if (cities.length > 0) {
      await this.localStorage.set({ cities: [...cities, param.city] });
    } else {
      await this.localStorage.set({ cities: [param.city] });
    }
  }
}
