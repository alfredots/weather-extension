import { DataStorage } from '@/application/protocols';
import { AddNewCity } from '@/domain/use-cases/add-new-city';

export class AddNewCityImpl implements AddNewCity {
  constructor(private readonly storage: DataStorage) {}

  async execute(param: { city: string }): Promise<void> {
    const { cities } = await this.storage.get(['cities']);

    if (cities.length > 0) {
      await this.storage.set({ cities: [...cities, param.city] });
    } else {
      await this.storage.set({ cities: [param.city] });
    }
  }
}
