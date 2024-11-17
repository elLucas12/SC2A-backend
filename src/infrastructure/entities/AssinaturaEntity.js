import { Entity } from "typeorm";
import { Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";
import { AplicativoEntityORM } from "./AplicativoEntity";
import { ClienteEntityORM } from "./ClienteEntity";
import { PagamentoEntityORM } from "./PagamentoEntity";

/**
 * Classe espelho da classe AssinaturaEntity para acesso e armazenamento de dados
 */
@Entity('Assinatura')
export class AssinaturaEntityORM {
    @PrimaryGeneratedColumn('int')
    codigo;

    @ManyToOne(type => AplicativoEntityORM, {eager: true, nullable: false})
    @JoinColumn()
    codApp;

    @ManyToOne(type => ClienteEntityORM, (cliente) => cliente.assinatura, {eager: true, nullable: false})
    @JoinColumn()
    codCli;

    @Column('date')
    inicioVigencia;

    @Column('date')
    fimVigencia;

    @OneToMany(type => PagamentoEntityORM, (pagamento) => pagamento.codAssinatura)
    @JoinColumn()
    pagamento;
}