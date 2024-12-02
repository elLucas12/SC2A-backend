import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('CacheAssinatura')
export class CacheAssinatura {
    @PrimaryGeneratedColumn()
    codigo;

    @Column('int')
    assinatura;

    @Column('boolean')
    isValid;
}