import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { execSync } from 'node:child_process';
import { randomUUID } from "node:crypto";
import { Environment } from "vitest";

// postgresql://docker:docker@localhost:5432/apisolid?schema=public
const prisma = new PrismaClient();

function generateDatabaseURL(schema: string) {
  if(!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }

  const url = new URL(process.env.DATABASE_URL);
  //pego o parametro schema no fim da url e substituo
  url.searchParams.set('schema', schema);
  //devolvo a url como string
  return url.toString();
}

export default <Environment>{
  name: 'prisma',
  async setup() { // executar antes de cada teste, neste ambiente, para teste e2e
    //gerar um banco de dados unico pra cada switch de testes

    //gero um id diferente pra cada ambiente de teste
    const schema = randomUUID();
    //substituo o schema de cada string
    const databaseURL = generateDatabaseURL(schema);
    //substituo minha variavel de ambiente em cada teste, e em cada teste eu tenha um novo banco de dados, limpo, para teste
    process.env.DATABASE_URL = databaseURL;

    //funcao que vai executar um comando no terminal, executar as migrations
    execSync('npx prisma migrate deploy')

    return {
      //executar apos cada comando de teste
      async teardown() {
        //depois que o teste foi rodado no ambiente isolado, quero apagar o schema
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
        await prisma.$disconnect()
      }, 
    }
  },
}