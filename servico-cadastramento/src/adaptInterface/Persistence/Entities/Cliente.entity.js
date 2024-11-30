import { Entity } from 'typeorm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cliente')
export class Cliente {
    @PrimaryGeneratedColumn()
    codigo;

    @Column('varchar')
    nome;

    @Column('varchar')
    email;
}
