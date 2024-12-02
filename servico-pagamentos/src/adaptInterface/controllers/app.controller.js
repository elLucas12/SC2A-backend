import { Controller, Dependencies, Bind, Body, Post } from '@nestjs/common';
import { RegistraPagamentoUC } from '../../aplication/RegistraPagamento';

@Controller()
@Dependencies(RegistraPagamentoUC)
export class AppController {
  constructor(registraPagamentoUC) {
    this.registraPagamentoUC = registraPagamentoUC;
  }

  /**
   * Registra um pagamento e envia os devidos alertas internamente.
   * 
   * A entrada deve apresenta o dia, o mês e o ano, além do código da assinatura relacionada
   * e o valor pago na data indicada.
   * 
   * @param {Array} dados Dados que compõem a data, o ID e o valor do pagamento.
   * @return Nada.
   */
  @Post('/registrarpagamento')
  @Bind(Body())
  async postRegistrarPagamento(dados) {
    return this.registraPagamentoUC.run(dados);
  }
}
