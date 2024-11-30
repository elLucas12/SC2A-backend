import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Pagamento')
export class Pagamento {
    @PrimaryGeneratedColumn()
    codigo;

    @Column('int')
    assinatura;

    @Column('decimal')
    valorPago;

    @Column('date')
    dataPagamento;
}