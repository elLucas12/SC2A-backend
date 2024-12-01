import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('CacheAssinatura')
export class CacheAssinatura {
    @PrimaryColumn('int')
    codigo;

    @Column('int')
    aplicativo;

    @Column('int')
    cliente;

    @Column('date')
    inicioVigencia;

    @Column('date')
    fimVigencia;
}