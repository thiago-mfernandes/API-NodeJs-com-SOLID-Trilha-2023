import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { FastifyRequest, FastifyReply } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  
  //quero saber qual eh o usuario que esta autenticado que esta chamando essa rota profile
  
  //console.log(request.headers);

  // preciso validar que este token foi gerado pelo meu backend e obter as infos do usuario que estao dentro do token

  //await request.jwtVerify(); //verifica no header a assinatura do token
  // console.log(request.user.sub); // aqui eu tenho o id do usuario
  // precisa tipar o sub

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  //vai devolver junto o password_hash, entao

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    }
  });
}