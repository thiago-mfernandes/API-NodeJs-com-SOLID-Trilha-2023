import { UsersRepository } from "@/repositories/prisma/users-repository";
import { RegisterUseCase } from "../register-use-case";

export function makeRegisterUseCase() {
  const usersRepository = new UsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}