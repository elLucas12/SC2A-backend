import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoCadastramento } from '../domain/services/ServicoCadastramento';

@Injectable()
@Dependencies(ServicoCadastramento)
export class AssinaturaPorCodigo_UC {
    #servicoCadastramento;

    constructor(servicoCadastramento) {
        this.#servicoCadastramento = servicoCadastramento;
    }

    /**
     * Retorna um objeto de assinatura conforme código passado.
     * @param {Number} assinatura Código de indentificação da assinatura no banco.
     */
    async run(assinatura) {
        return await this.#servicoCadastramento.assinaturaPorId(assinatura);
    }
}