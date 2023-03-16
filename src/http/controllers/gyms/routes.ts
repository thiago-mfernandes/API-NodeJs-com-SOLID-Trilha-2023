import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create-controller";
import { nearby } from "./nearby-controller";
import { search } from "./search-controller";

// um plugin do fastify precisa ser uma funcao assincrona
export async function gymsRoutes(app: FastifyInstance) {
  // o fastify chama de hook o middleware. Tudo do hook pra baixo vai passar pela verificacao do token
  app.addHook('onRequest', verifyJWT);

  app.get('/gyms/search', search);
  app.get('/gyms/nearby', nearby);
  app.post('/gyms', create);
}