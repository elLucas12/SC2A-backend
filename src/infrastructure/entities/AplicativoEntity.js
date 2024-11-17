import { Entity } from "typeorm";
import { Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { AssinaturaEntityORM } from "./AssinaturaEntity";

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

    @OneToMany(type => AssinaturaEntityORM, (assinatura) => assinatura.codApp)
    assinatura;
}