import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoAssinaturasValidas } from '../domain/ServicoAssinaturasValidas';

@Injectable()
@Dependencies(ServicoAssinaturasValidas)
export class AssinaturaAtivaUC {
    constructor(servicoAssinaturasValidas) {
        this.servicoAssinaturasValidas = servicoAssinaturasValidas;
    }

    async run(assinatura) {
        return await this.servicoAssinaturasValidas.aindaAtiva(assinatura);
    }
}