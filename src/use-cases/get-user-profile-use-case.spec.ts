import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from  "vitest";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { GetProfileUseCase } from "./get-user-profile-use-case";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";

let usersRepository: InMemoryUsersRepository;
let sut: GetProfileUseCase;

describe("Get User Profile Use Case", () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetProfileUseCase(usersRepository);
  })

  it("should be able to get user profile", async () => {
    
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual('John Doe');
  });

  it("should not be able to get user profile with wrong id", async () => {
    //tentar com um email que nao existe, sem cadastrar nada

    await expect(() => sut.execute({
      userId: 'non-existing-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
})