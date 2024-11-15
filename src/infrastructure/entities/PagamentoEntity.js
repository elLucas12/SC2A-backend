import { Entity } from "typeorm";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

/**
 * Classe espelho da classe PagamentoEntity para acesso e armazenamento de dados
 */
@Entity('Pagamento')
export class PagamentoEntityORM {
    @PrimaryGeneratedColumn('int')
    codigo;

    @ManyToOne(() => Assinatura, {
        eager: true,
        nullable: false
    })
    codAssinatura;

    @Column('decimal')
    valorPago;

    @Column('date')
    dataPagamento;
}