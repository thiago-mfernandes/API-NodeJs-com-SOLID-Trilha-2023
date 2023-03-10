export class UserAlreadyExistsError extends Error {
  //chama o super que eh o metodo construcotr da classe Error
  constructor() {
    super("Email Already Exists!");
  }
}