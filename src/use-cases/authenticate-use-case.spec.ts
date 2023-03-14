import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from  "vitest";
import { AuthenticateUseCase } from "./authenticate-use-case";
import { InvalidCredentialsError } from "./errors/invalid-credential-error";
import { InMemoryUsersRepository } from "./in-memory/in-memory-users-repository";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  })

  it("should be able to authenticate", async () => {
    //preciso cadastrar um usuario primeiro antes de verificar sua autenticacao

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    //tentar com um email que nao existe, sem cadastrar nada

    await expect(() => sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() => sut.execute({
      email: 'johndoe@example.com',
      password: '123123',
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
})