import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('Usuario')
export class Usuario {
    @PrimaryColumn('varchar')
    usuario;

    @Column('varchar')
    senha;
}