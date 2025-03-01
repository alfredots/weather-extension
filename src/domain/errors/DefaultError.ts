export class DefaultError extends Error {
  constructor() {
    super('Houve um erro');
    this.name = 'DefaultError';
  }
}
