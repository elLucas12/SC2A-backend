import { NestFactory } from '@nestjs/core';
import { AppModule } from './adaptInterface/Controllers/app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [ 'amqps://dolctaei:mcQy77OKq743FpmNWQ--fnpTBG3krHJM@jackal.rmq.cloudamqp.com/dolctaei' ],
      queue: 'fila_pagamentos'
    }
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();