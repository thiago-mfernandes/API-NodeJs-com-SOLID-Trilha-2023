import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { checkInsRoutes } from './http/controllers/check-ins/routes';
import { gymsRoutes } from './http/controllers/gyms/routes';
import { usersRoutes } from './http/controllers/users/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

// register recebe o plugin que precisa ser async
app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

// cair na tratativa de erros do fastify
app.setErrorHandler((error, request, reply) => {
  // se o erro for de validacao
  if(error instanceof ZodError) {
    //enviar uma mensagem e em issues: apontar qual campo esta errado
    return reply.status(400).send({ message: "Validation error.", issues: error.format() })
  }

  if(env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Fazer o log para uma ferramenta externa: DataLogo/newRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal Server Error." })
})