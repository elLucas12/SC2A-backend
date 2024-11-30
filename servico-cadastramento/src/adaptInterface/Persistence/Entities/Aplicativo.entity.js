import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Aplicativo')
export class Aplicativo {
    @PrimaryGeneratedColumn()
    codigo;

    @Column("varchar")
    nome;

    @Column("decimal", { precision: 6, scale: 2 })
    custoMensal;
}
