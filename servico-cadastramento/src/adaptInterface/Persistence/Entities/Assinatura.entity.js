import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import { Aplicativo } from './Aplicativo.entity';
import { Cliente } from './Cliente.entity';

@Entity('Assinatura')
export class Assinatura {
    @PrimaryGeneratedColumn()
    codigo;

    @ManyToOne(() => Aplicativo, {eager: true, nullable: false})
    aplicativo;

    @ManyToOne(() => Cliente, {eager:true, nullable:false})
    cliente;

    @Column('date')
    inicioVigencia;

    @Column('date')
    fimVigencia;
}
