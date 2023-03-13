export class InvalidCredentialsError extends Error {
  //chama o super que eh o metodo construcotr da classe Error
  constructor() {
    super("Invalid Credentials!");
  }
}