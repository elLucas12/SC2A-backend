import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoAssinaturasValidas } from '../domain/ServicoAssinaturasValidas';

@Injectable()
@Dependencies(ServicoAssinaturasValidas)
export class ConsumirEventoPagamento_UC {
    #servicoAssinaturasValidas;

    constructor(servicoAssinaturasValidas) {
        this.#servicoAssinaturasValidas = servicoAssinaturasValidas;
    }

    async run(dados) {
        return await this.#servicoAssinaturasValidas.deletarCacheAssinaturas(dados.assinatura);
    }
}