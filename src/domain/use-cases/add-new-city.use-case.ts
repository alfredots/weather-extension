import { StorageGateway } from '@/domain/gateways/storage-gateway.interface';
import { UseCase } from '@/domain/utils/use-case';

export class AddNewCity implements UseCase<{ city: string }, Promise<void>> {
  constructor(private readonly localStorage: StorageGateway) {}

  async execute(param: { city: string }): Promise<void> {
    const { cities } = await this.localStorage.get(['cities']);

    if (cities.length > 0) {
      await this.localStorage.set({ cities: [...cities, param.city] });
    } else {
      await this.localStorage.set({ cities: [param.city] });
    }
  }
}
