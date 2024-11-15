import { Entity } from "typeorm";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

/**
 * Classe espelho da classe AssinaturaEntity para acesso e armazenamento de dados
 */
@Entity('Assinatura')
export class AssinaturaEntityORM {
    @PrimaryGeneratedColumn('int')
    codigo;

    @ManyToOne(() => Aplicativo, {
        eager: true,        // Sempre deve ser carregado junto
        nullable: false     // Pode ser null
    })
    codApp;

    @ManyToOne(() => Cliente, {
        eager: true,
        nullable: false
    })
    codCli;

    @Column('date')
    inicioVigencia;

    @Column('date')
    fimVigencia;
}