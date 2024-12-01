import { Controller, Dependencies, Get, Bind, Param } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ServicoAssinaturasValidas } from '../../domain/ServicoAssinaturasValidas';
import { AssinaturaAtivaUC } from '../../aplication/AssinaturaAtiva';

@Controller()
@Dependencies(
  ServicoAssinaturasValidas,
  AssinaturaAtivaUC
)
export class AppController {
  constructor(servicoAssinaturasValidas, assinaturaAtivaUC) {
    this.servicoAssinaturasValidas = servicoAssinaturasValidas;
    this.assinaturaAtivaUC = assinaturaAtivaUC;
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

  @EventPattern('ServicoAssinaturasValidas')
  eventoPagamento(dados) {
    console.log(dados);
  }
}
