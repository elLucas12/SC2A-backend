import { Entity } from "typeorm";
import { Column, PrimaryGeneratedColumn } from "typeorm";

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
}