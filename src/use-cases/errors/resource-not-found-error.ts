export class ResourceNotFoundError extends Error {
  //chama o super que eh o metodo construcotr da classe Error
  constructor() {
    super("Resource Not Found!");
  }
}