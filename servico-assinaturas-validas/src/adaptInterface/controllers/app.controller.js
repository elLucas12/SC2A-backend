import { Controller, Dependencies, Get, Bind, Param } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ServicoAssinaturasValidas } from '../../domain/ServicoAssinaturasValidas';
import { AssinaturaAtiva_UC } from '../../aplication/AssinaturaAtiva';
import { ConsumirEventoPagamento_UC } from '../../aplication/ConsumirEventoPagamento';

@Controller()
@Dependencies(
  ServicoAssinaturasValidas,
  AssinaturaAtiva_UC,
  ConsumirEventoPagamento_UC
)
export class AppController {
  constructor(servicoAssinaturasValidas, assinaturaAtivaUC, consumirEventoPagamentoUC) {
    this.servicoAssinaturasValidas = servicoAssinaturasValidas;
    this.assinaturaAtivaUC = assinaturaAtivaUC;
    this.consumirEventoPagamentoUC = consumirEventoPagamentoUC;
  }

  /**
   * Recebe o ID de uma assinatura e retorna se a assinatura é válida.
   * 
   * @param {Array} param Lista de parâmetros, especificando o código da assinatura.
   * @return 'false' para assinatura inválida e 'true' para válida.
   */
  @Get('/assinvalidas/:idAssinatura')
  @Bind(Param())
  async getAssinaturaValida(param) {
    return this.assinaturaAtivaUC.run(param.idAssinatura);
  }

  /**
   * Ações sobre o evento de pagamento do ServicoPagamentos.
   * 
   * Ocorre a atualização do cache de assinaturas conforme o pagamento realizado.
   * 
   * @param {Array} dados Dados do payload do evento.
   */
  @EventPattern('ServicoAssinaturasValidas')
  async eventoPagamento(dados) {
    this.consumirEventoPagamentoUC.run(dados);
  }
}
