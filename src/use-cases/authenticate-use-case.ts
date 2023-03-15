
import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credential-error";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    //processo de auth: buscar usuario no banco pelo email
    //comparar a senha salva no banco bate com a senha do parametro

    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new InvalidCredentialsError();      
    }

    // se o password matches
    // nome de variaveis booleanas: "is", "has", "does"

    //compare: pega a senha sem ter feito hash, gera o hash e compara com a senha salva no bd
    const doesPasswordMatches = await compare(password, user.password_hash);

    if(!doesPasswordMatches) {
      throw new InvalidCredentialsError();      
    }

    return {
      user,
    }
  }
}