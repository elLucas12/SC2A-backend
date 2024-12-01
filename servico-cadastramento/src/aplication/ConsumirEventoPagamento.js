import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoCadastramento } from '../domain/services/ServicoCadastramento';

@Injectable()
@Dependencies(ServicoCadastramento)
export class ConsumirEventoPagamento_UC {
    #servicoCadastramento;

    constructor(servicoCadastramento) {
        this.#servicoCadastramento = servicoCadastramento;
    }

    async run(dados) {
        return await this.#servicoCadastramento.consumirPagamento(dados.assinatura, dados.dataPagamento);
    }
}