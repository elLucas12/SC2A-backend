/**
 * Modelo da entidade Pagamento.
 *
 * Representa uma instância de pagamento presente no sistema.
 */
export class PagamentoModel {
    codigo;
    assinatura;
    valorPago;
    dataPagamento;

    constructor(codigo, assinatura, valorPago, dataPagamento) {
        this.codigo = codigo;
        this.assinatura = assinatura;
        this.valorPago = valorPago;
        this.dataPagamento = dataPagamento;
    }
}
