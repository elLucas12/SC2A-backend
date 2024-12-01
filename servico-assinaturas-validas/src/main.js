import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './adaptInterface/controllers/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [ 'amqps://dolctaei:mcQy77OKq743FpmNWQ--fnpTBG3krHJM@jackal.rmq.cloudamqp.com/dolctaei' ],
      queue: 'fila_pagamentos'
    }
  });
  // const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3002);
}
bootstrap();
