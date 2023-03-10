import { UsersRepositoryInterface } from "@/repositories/prisma/users-repository-interface";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

/**
 * SECTION UseCase =>
 * NOTE Inversão de dependência:
 * em vez do meu repositorio instanciar a dependencia  
 * const prismaUsersRepository = new PrismaUsersRepository();
 * eu recebo por parametro pelo constructor
 */

export class RegisterUseCase {

  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ 
    email, 
    name, 
    password
  } : RegisterUseCaseRequest) {
    
    /**
     * SECTION Função Hash "bcryptjs" - como usar
     * NOTE segundo parametro do hash, numero de rounds. Qtd de vezes que o hash vai ser feito com base no hash anterior
     */
    
    const password_hash = await hash(password, 6);
  
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
  
    if(userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }
  
    // const prismaUsersRepository = new PrismaUsersRepository();
  
    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}