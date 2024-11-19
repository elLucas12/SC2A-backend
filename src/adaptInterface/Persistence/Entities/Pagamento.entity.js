import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Assinatura } from './Assinatura.entity';

@Entity('Pagamento')
export class Pagamento {
    @PrimaryGeneratedColumn()
    codigo;

    @ManyToOne(() => Assinatura, {eager: true, nullable: false})
    assinatura;

    @Column('decimal')
    valorPago;

    @Column('date')
    dataPagamento;
}