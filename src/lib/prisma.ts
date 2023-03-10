import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  // objeto de configuracao de logs:
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
});