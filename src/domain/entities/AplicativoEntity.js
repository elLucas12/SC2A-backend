/**
 * Entidade Aplicativo.
 *
 * Representa uma instância de aplicativo presente no sistema.
 */
export class AplicativoEntity {
    codigo;
    nome;
    custoMensal;

    constructor(codigo, nome, custoMensal) {
        this.codigo = codigo;
        this.nome = nome;
        this.custoMensal = custoMensal;
    }
}
