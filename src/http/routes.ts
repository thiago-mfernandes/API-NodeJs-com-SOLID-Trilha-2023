import { FastifyInstance } from "fastify";
import { authenticate } from "./controllers/authenticate-controller";
import { register } from "./controllers/register-controller";

// um plugin do fastify precisa ser uma funcao assincrona
export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);
}