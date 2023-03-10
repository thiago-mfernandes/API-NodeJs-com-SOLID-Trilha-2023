import { FastifyInstance } from "fastify";
import { register } from "./controllers/register-controller";

// um plugin do fastify precisa ser uma funcao assincrona
export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}