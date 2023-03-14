export class MaxNumberOfCheckInsError extends Error {
  //chama o super que eh o metodo construcotr da classe Error
  constructor() {
    super("Max number of check-ins reached.");
  }
}