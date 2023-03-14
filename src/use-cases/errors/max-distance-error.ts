export class MaxDistanceError extends Error {
  //chama o super que eh o metodo construcotr da classe Error
  constructor() {
    super("Max distance reached.");
  }
}