import { Prisma, User } from "@prisma/client";

/**
 * SECTION Como Funciona a Interface do Repositório
 * NOTE Depende de uma Entidade
 * NOTE Possui a responsabilidade única de definir quais serão os métodos implementados no repositório
 */

export interface UsersRepositoryInterface {

  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  
}