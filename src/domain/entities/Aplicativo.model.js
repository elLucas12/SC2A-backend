/**
 * Modelo da Entidade Aplicativo.
 *
 * Representa uma instância de aplicativo presente no sistema.
 */
export class AplicativoModel {
    codigo;
    nome;
    custoMensal;

    constructor(codigo, nome, custoMensal) {
        this.codigo = codigo;
        this.nome = nome;
        this.custoMensal = custoMensal;
    }
}
