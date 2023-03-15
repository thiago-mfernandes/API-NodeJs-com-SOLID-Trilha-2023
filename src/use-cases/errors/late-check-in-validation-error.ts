export class LateCheckInValidationError extends Error {
  //chama o super que eh o metodo construcotr da classe Error
  constructor() {
    super("The check-in can only be validated until 20 minutes of its creation");
  }
}