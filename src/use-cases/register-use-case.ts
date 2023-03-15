import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

/**
 * SECTION UseCase =>
 * NOTE Inversão de dependência:
 * em vez do meu repositorio instanciar a dependencia  
 * const prismaUsersRepository = new PrismaUsersRepository();
 * eu recebo por parametro pelo constructor
 */

export class RegisterUseCase {

  constructor(private usersRepository: UsersRepository) {}

  async execute({ 
    email, 
    name, 
    password
  } : RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    
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
  
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user, };
  }
}