import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';

import { Aplicativo } from '../Persistence/Entities/Aplicativo.entity';
import { Assinatura } from '../Persistence/Entities/Assinatura.entity';
import { Cliente } from '../Persistence/Entities/Cliente.entity';
import { Usuario } from '../Persistence/Entities/Usuario.entity';
import { Pagamento } from '../Persistence/Entities/Pagamento.entity';

import { IAplicativosModelRepository } from '../../domain/repositories/IAplicativosModel.repository';
import { IAssinaturasModelRepository } from '../../domain/repositories/IAssinaturasModel.repository';
import { IClientesModelRepository } from '../../domain/repositories/IClientesModel.repository';
import { IPagamentosModelRepository } from '../../domain/repositories/IPagamentosModel.repository';
import { IUsuariosModelRepository } from '../../domain/repositories/IUsuariosModel.repository';

import { AplicativosRepositoryORM } from '../Persistence/Repositories/AplicativosORM.repository';
import { AssinaturasRepositoryORM } from '../Persistence/Repositories/AssinaturasORM.repository';
import { ClientesRepositoryORM } from '../Persistence/Repositories/ClientesORM.repository';
import { PagamentosRepositoryORM } from '../Persistence/Repositories/PagamentosORM.repository';
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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService) => ({
        type: "mysql",
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        autoLoadEntities: true
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([
      Aplicativo,
      Assinatura,
      Cliente,
      Pagamento,
      Usuario
    ]),
  ],
  controllers: [AppController],
  providers: [
    IAplicativosModelRepository,
    IAssinaturasModelRepository,
    IClientesModelRepository,
    IPagamentosModelRepository,
    IUsuariosModelRepository,
    AplicativosRepositoryORM,
    AssinaturasRepositoryORM,
    ClientesRepositoryORM,
    PagamentosRepositoryORM,
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
    RegistraAplicativo_UC
  ],
})
export class AppModule {}
