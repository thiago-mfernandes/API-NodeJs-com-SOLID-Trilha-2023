import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepositoryInterface } from "./users-repository-interface";

/**
 * SECTION Como Funciona o Repositório
 * NOTE Depende de uma Interface
 * NOTE Possui a responsabilidade única de comunicar-se com o banco de dados
 */

export class UsersRepository implements UsersRepositoryInterface {
  
  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: string) {
    //validar se existe um usuario com esse email e tratar o erro
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    return userWithSameEmail;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      // envia o objeto pela prop data
      data
    })

    return user;
  }
}