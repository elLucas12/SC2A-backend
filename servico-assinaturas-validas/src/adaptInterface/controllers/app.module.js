import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';

import { CacheAssinatura } from '../persistence/entities/CacheAssinatura.entity';
import { ServicoAssinaturasValidas } from '../../domain/ServicoAssinaturasValidas';
import { CacheAssinaturasRepositoryORM } from '../persistence/repositories/CacheAssinaturasORM.repository';
import { AssinaturaAtiva_UC } from '../../aplication/AssinaturaAtiva';
import { ConsumirEventoPagamento_UC } from '../../aplication/ConsumirEventoPagamento';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true // uso em serv.
    }),
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
      CacheAssinatura
    ]),
    HttpModule
  ],
  controllers: [AppController],
  providers: [
    ServicoAssinaturasValidas,
    CacheAssinaturasRepositoryORM,
    AssinaturaAtiva_UC,
    ConsumirEventoPagamento_UC
  ],
})
export class AppModule {}
