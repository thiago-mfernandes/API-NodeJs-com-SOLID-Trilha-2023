import 'dotenv/config'
import { z } from 'zod'
/**
 * SECTION Variáveis de Ambiente
 * NOTE recedo de dentro do process.env: { NODE_ENV: 'dev', ... } Um objeto
 * 
 * NOTE O metodo SafeParse tenta validar o objeto, e caso não consiga, lança um throw, parando a aplicação.
 */
// 

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables.', _env.error.format());
  throw new Error('❌ Invalid environment variables.');
}

export const env = _env.data // retorna as variaveis do schema validadas
