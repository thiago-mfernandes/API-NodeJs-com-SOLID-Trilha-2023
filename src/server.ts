import { app } from '@/app';
import { env } from '@/env';

app
  .listen({
    host: '0.0.0.0', // torna acessivel para o front-end consumir
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server Running!');
  })
