import { Entity } from "typeorm";
import { Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { AssinaturaEntityORM } from "./AssinaturaEntity";

/**
 * Classe espelho da classe ClienteEntity para acesso e armazenamento de dados
 */
@Entity('Cliente')
export class ClienteEntityORM {
    @PrimaryGeneratedColumn('int')
    codigo;

    @Column('varchar')
    nome;

    @Column('varchar')
    email;

    @OneToMany(type => AssinaturaEntityORM, (assinatura) => assinatura.codCli)
    assinatura;
}