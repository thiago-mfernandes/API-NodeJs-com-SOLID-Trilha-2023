import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

/**
 * SECTION Como Funciona o Repositório
 * NOTE Depende de uma Interface
 * NOTE Possui a responsabilidade única de comunicar-se com o banco de dados
 */

export class PrismaUsersRepository implements UsersRepository {
  
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      }
    })
    return user;
  }

  async findByEmail(email: string) {
    //validar se existe um usuario com esse email e tratar o erro
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      // envia o objeto pela prop data
      data
    })

    return user;
  }
}