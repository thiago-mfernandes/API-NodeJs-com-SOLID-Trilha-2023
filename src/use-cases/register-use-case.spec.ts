import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from  "vitest";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { InMemoryUsersRepository } from "./in-memory/in-memory-users-repository";
import { RegisterUseCase } from "./register-use-case";

//essas variaveis let vao da visibilidade das intancias dentro dos testes
//declaro sem inicializar e depois atribuo o valor no beforeEach
let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {

  beforeEach(() => {
    // enviar dados ficticios. Os dados nao estao atralados ao banco de dados, isolando o teste do banco
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  })

  it("should hbe able to register", async () => {
    
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));

  });

  it("should hash user password upon registration", async () => {
    
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    //metodo do bcrypt capaz de comparar o antes e depois da senha 'Hashed'
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true);

  });

  it("should not be able to register with same email twice", async () => {
    
    const email = 'johndoe@example.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });

    //espero que qdo essa Promise terminar, ela Reject

    await expect(() => 
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
})