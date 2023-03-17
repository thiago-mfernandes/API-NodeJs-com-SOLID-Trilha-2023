import { FastifyRequest, FastifyReply } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  // a rota de fresh nao vai passar pelo jwtVerify, ela vai ver apenas se o usuario possui um refreshToken

  const teste = await request.jwtVerify({ onlyCookie: true });
  console.log(teste)

  const { role } = request.user;
  
  // criar o token: param1:payload, param2: colocar o id do user aqui
  const token = await reply.jwtSign(
    { role }, 
    {
      sign: {
        sub: request.user.sub, //dados do usuario logado atualmente
      },
    },
  )

  // este refreshToken foi criado por este usuario
  const refreshToken = await reply.jwtSign(
    { role }, 
    {
      sign: {
        sub: request.user.sub, 
        expiresIn: '7d',
      },
    },
  )
  
  return reply
    //envio para o contexto das requisicoes um cookie chamado refreshToken
    .setCookie('refreshToken', refreshToken, {
      path: '/', //todo backend le esse valor
      secure: true, //encriptado, indisponivel pro front
      sameSite: true, //acessivel somente pelo memo site
      httpOnly: true, //soh pode ser acessado atraves de req http
    })
    // envio pelo send o token que fica disponivel ao front
    .status(200)
    .send({ 
      token,
    })
} 