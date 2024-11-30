import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';

import { ServicoPagamentos } from '../../domain/ServicoPagamentos';
import { RegistraPagamentoUC } from '../../aplication/RegistraPagamento';
import { PagamentosRepositoryORM } from '../persistence/PagamentosORM.repository';
import { Pagamento } from '../persistence/Pagamento.entity';
import { IPagamentosModelRepository } from '../../domain/repositories/IPagamentosModel.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService) => ({
        type: "mysql",
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        synchronize: true,
        autoLoadEntities: true,
        logging: true
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([
      Pagamento
    ]),
    ClientsModule.register([
      {
        name: 'FILAPAGAMENTO',
        transport: Transport.RMQ,
        options: {
          urls: [ 'amqps://dolctaei:mcQy77OKq743FpmNWQ--fnpTBG3krHJM@jackal.rmq.cloudamqp.com/dolctaei' ],
          queue: 'fila_pagamentos'
        }
      }
    ]),
  ],
  controllers: [AppController],
  providers: [
    ServicoPagamentos,
    RegistraPagamentoUC,
    IPagamentosModelRepository,
    PagamentosRepositoryORM
  ],
})
export class AppModule {}
