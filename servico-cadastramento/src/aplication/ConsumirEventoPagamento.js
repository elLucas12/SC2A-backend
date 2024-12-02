import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoCadastramento } from '../domain/services/ServicoCadastramento';
import { ValorInvalidoPagamento } from '../adaptInterface/Persistence/Exceptions/ValorInvalidoPagamento';

@Injectable()
@Dependencies(ServicoCadastramento)
export class ConsumirEventoPagamento_UC {
    #servicoCadastramento;

    constructor(servicoCadastramento) {
        this.#servicoCadastramento = servicoCadastramento;
    }

    async run(dados) {
        try {
            await this.#servicoCadastramento.consumirPagamento(
                dados.assinatura, dados.valorPago, dados.dataPagamento
            );
        } catch(error) {
            if (error instanceof ValorInvalidoPagamento) {
                console.error("Valor inválido de pagamento! -- Pagamento não foi registrado!!");
            } else {
                throw new Error(`Exceção ao consumir evento de pagamento. ${error}`);
            }
        }
    }
}