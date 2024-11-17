import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Arquivo de configuração de env.
import { database } from './config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AplicativoEntityORM } from './infrastructure/entities/AplicativoEntity';
import { AssinaturaEntityORM } from './infrastructure/entities/AssinaturaEntity';
import { ClienteEntityORM } from './infrastructure/entities/ClienteEntity';
import { UsuarioEntityORM } from './infrastructure/entities/UsuarioEntity';
import { PagamentoEntityORM } from './infrastructure/entities/PagamentoEntity';

import { AssinaturasRepositoryORM } from './infrastructure/AssinaturasRepositoryORM';
import { AplicativosRepositoryORM } from './infrastructure/AplicativosRepositoryORM';
import { ClientesRepositoryORM } from './infrastructure/ClientesRepositoryORM';
import { UsuariosRepositoryORM } from './infrastructure/UsuariosRepositoryORM';
import { PagamentosRepositoryORM } from './infrastructure/PagamentosRepositoryORM';

import { ServicoCadastramento } from './domain/services/ServicoCadastramento';
import { ClientesCadastrados_UC } from './aplication/ClientesCadastrados';
import { AplicativosCadastrados_UC } from './aplication/AplicativosCadastrados';
import { RegistraAssinatura_UC } from './aplication/RegistraAssinatura';
import { AtualizaCusto_UC } from './aplication/AtualizaCusto';
import { AssinaturasVigentes_UC } from './aplication/AssinaturasVigentes';
import { AssinaturasClientes_UC } from './aplication/AssinaturasClientes';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: database.type,
      host: database.host,
      port: database.port,
      username: database.username,
      password: database.password,
      database: database.database,
      synchronize: true,
      entities: [
        AplicativoEntityORM,
        AssinaturaEntityORM,
        ClienteEntityORM,
        UsuarioEntityORM,
        PagamentoEntityORM
      ]
    }),
    TypeOrmModule.forFeature([
      AplicativoEntityORM,
      AssinaturaEntityORM,
      ClienteEntityORM,
      UsuarioEntityORM,
      PagamentoEntityORM
    ])
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    AplicativosRepositoryORM,
    AssinaturasRepositoryORM,
    ClientesRepositoryORM,
    UsuariosRepositoryORM,
    PagamentosRepositoryORM,
    ServicoCadastramento,
    ClientesCadastrados_UC,
    AplicativosCadastrados_UC,
    RegistraAssinatura_UC,
    AtualizaCusto_UC,
    AssinaturasVigentes_UC,
    AssinaturasClientes_UC
  ],
})
export class AppModule {}
