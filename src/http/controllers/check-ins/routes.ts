import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create-controller";
import { history } from "./history-controller";
import { metrics } from "./metrics-controller";
import { validate } from "./validate-controller";

// um plugin do fastify precisa ser uma funcao assincrona
export async function checkInsRoutes(app: FastifyInstance) {
  // o fastify chama de hook o middleware. Tudo do hook pra baixo vai passar pela verificacao do token
  app.addHook('onRequest', verifyJWT);

  app.get('/check-ins/history', history);
  app.get('/check-ins/metrics', metrics);
  app.post('/gyms/:gymId/check-ins', create);
  app.patch('/check-ins/:checkInId/validate', validate);
}