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
        const assinaturaModel = (await this.#servicoCadastramento.assinaturaPorId(assinatura))[0];
        return {
            codigo: assinaturaModel.codigo,
            aplicativo: assinaturaModel.aplicativo.codigo,
            cliente: assinaturaModel.cliente.codigo,
            inicioVigencia: assinaturaModel.inicioVigencia,
            fimVigencia: assinaturaModel.fimVigencia
        };
    }
}