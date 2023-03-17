import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate-controller";
import { profile } from "./profile-controller";
import { refresh } from "./refresh-controller";
import { register } from "./register-controller";

// um plugin do fastify precisa ser uma funcao assincrona
export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refresh);

  /**Only for Authenticated Users */
  // a cada requisicao, passa req, reply pra verificar o jwt
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}