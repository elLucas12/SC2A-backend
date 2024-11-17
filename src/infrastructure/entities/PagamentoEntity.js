import { Entity } from "typeorm";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AssinaturaEntityORM } from "./AssinaturaEntity";

/**
 * Classe espelho da classe PagamentoEntity para acesso e armazenamento de dados
 */
@Entity('Pagamento')
export class PagamentoEntityORM {
    @PrimaryGeneratedColumn('int')
    codigo;

    @ManyToOne(type => AssinaturaEntityORM, (assinatura) => assinatura.pagamento, {eager: true})
    codAssinatura;

    @Column('decimal')
    valorPago;

    @Column('date')
    dataPagamento;
}