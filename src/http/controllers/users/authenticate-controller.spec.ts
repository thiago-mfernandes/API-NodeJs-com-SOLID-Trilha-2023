import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe('Authenticate Controller (e2e)', () => {

  beforeAll(async () => {
    await app.ready(); //esperar que o fastify inicialize toda a aplicacao
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {

    //usuario cria uma conta
    await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      })

    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'johndoe@example.com',
        password: '123456',
      })
    
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({
        token: expect.any(String),
      })
  })
})

/**
 * o teste e2e nao deve testar o que o teste unitario ja fez, isto eh, se enviar um email errado por exemplo, pequenas conficoes que podem ser testadas unitariamente
 */