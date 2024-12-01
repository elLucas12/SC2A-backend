import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';

import { Aplicativo } from '../Persistence/Entities/Aplicativo.entity';
import { Assinatura } from '../Persistence/Entities/Assinatura.entity';
import { Cliente } from '../Persistence/Entities/Cliente.entity';
import { Usuario } from '../Persistence/Entities/Usuario.entity';

import { IAplicativosModelRepository } from '../../domain/repositories/IAplicativosModel.repository';
import { IAssinaturasModelRepository } from '../../domain/repositories/IAssinaturasModel.repository';
import { IClientesModelRepository } from '../../domain/repositories/IClientesModel.repository';
import { IUsuariosModelRepository } from '../../domain/repositories/IUsuariosModel.repository';

import { AplicativosRepositoryORM } from '../Persistence/Repositories/AplicativosORM.repository';
import { AssinaturasRepositoryORM } from '../Persistence/Repositories/AssinaturasORM.repository';
import { ClientesRepositoryORM } from '../Persistence/Repositories/ClientesORM.repository';
import { UsuariosRepositoryORM } from '../Persistence/Repositories/UsuariosORM.repository';

import { ServicoCadastramento } from '../../domain/services/ServicoCadastramento';

import { AplicativosCadastrados_UC } from '../../aplication/AplicativosCadastrados';
import { AssinaturasAplicativo_UC } from '../../aplication/AssinaturasAplicativo';
import { AssinaturasClientes_UC } from '../../aplication/AssinaturasClientes';
import { AssinaturasVigentes_UC } from '../../aplication/AssinaturasVigentes';
import { AtualizaCusto_UC } from '../../aplication/AtualizaCusto';
import { ClientesCadastrados_UC } from '../../aplication/ClientesCadastrados';
import { RegistraAssinatura_UC } from '../../aplication/RegistraAssinatura';
import { RegistraCliente_UC } from '../../aplication/RegistraCliente';
import { RegistraUsuario_UC } from '../../aplication/RegistraUsuario';
import { RegistraAplicativo_UC } from '../../aplication/RegistraAplicativo';
import { AssinaturaPorCodigo_UC } from '../../aplication/AssinaturaPorCodigo';

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
      Aplicativo,
      Assinatura,
      Cliente,
      Usuario
    ])
  ],
  controllers: [AppController],
  providers: [
    IAplicativosModelRepository,
    IAssinaturasModelRepository,
    IClientesModelRepository,
    IUsuariosModelRepository,
    AplicativosRepositoryORM,
    AssinaturasRepositoryORM,
    ClientesRepositoryORM,
    UsuariosRepositoryORM,
    ServicoCadastramento,
    AplicativosCadastrados_UC,
    AssinaturasAplicativo_UC,
    AssinaturasClientes_UC,
    AssinaturasVigentes_UC,
    AtualizaCusto_UC,
    ClientesCadastrados_UC,
    RegistraAssinatura_UC,
    RegistraCliente_UC,
    RegistraUsuario_UC,
    RegistraAplicativo_UC,
    AssinaturaPorCodigo_UC
  ],
})
export class AppModule {}
