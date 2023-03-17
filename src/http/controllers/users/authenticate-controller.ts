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
    const token = await reply.jwtSign(
      {
        //salvar no payload do token, o role do usuario
        role: user.role
      }, 
      {
      sign: {
        sub: user.id, //nao colocar senha do user no payload
      }
    })

    // este refreshToken foi criado por este usuario
    const refreshToken = await reply.jwtSign(
      {
        role: user.role
      }, 
      {
      sign: {
        sub: user.id, //nao colocar senha do user no payload
        expiresIn: '7d',
      }
    })
    return reply
      //envio para o contexto das requisicoes um cookie chamado refreshToken
      .setCookie('refreshToken', refreshToken, {
        path: '/', //todo backend le esse valor
        secure: true, //encriptado, indisponivel pro front
        sameSite: true, //acessivel somente pelo memo site
        httpOnly: true, //soh pode ser acessado atraves de req http
      })
      // envio pelo send o token que fica disponivel ao front
      .status(200).send({ token });

  } catch (error) {
    if(error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    
    throw error;
  }
}