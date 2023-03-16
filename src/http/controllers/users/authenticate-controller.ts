import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credential-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-autenticate-use-case";

/**
 * no processo de login eu quero gerar o jwt
 * 
 */

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    // apos verificar se o email ja existe no banco
    const authenticateUseCase = makeAuthenticateUseCase();

    //criar o usuario
    const { user } = await authenticateUseCase.execute({
      email, 
      password,
    });

    // criar o token: param1:payload, param2: colocar o id do user aqui
    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.id, //nao colocar senha do user no payload
      }
    })
    // envio pelo send o token
    return reply.status(200).send({ token });

  } catch (error) {
    if(error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    
    throw error;
  }
}