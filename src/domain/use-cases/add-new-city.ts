export interface AddNewCity {
  execute(param: { city: string }): Promise<void>;
}
