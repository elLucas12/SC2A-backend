import { Entity } from "typeorm";
import { Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * Classe espelho da classe ProdutoEntity para acesso e armazenamento de dados
 */
@Entity('Aplicativo')
export class AplicativoEntityORM {
    @PrimaryGeneratedColumn('int')
    codigo;

    @Column('varchar')
    nome;

    @Column('decimal')
    custoMensal;
}