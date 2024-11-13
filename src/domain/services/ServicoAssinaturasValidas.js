import { Injectable } from "@nestjs/common";
import { Observer } from "../Observer";

@Injectable()
export class ServicoAssinaturasValidas extends Observer {
    #cache;

    constructor() {
        super();
        this.#cache = [];
    }

    /**
     * Recebe a notificação de alteração do repositório e remove a instância de cache
     * desatualizada.
     * 
     * @param {Number} codAssinatura Código referente a instância de assinatura.
     */
    notifica(codAssinatura) {
        this.#cache.map((item) => codAssinatura !== item.codAssinatura);
    }

    isAssinaturaValida(codigo) {

    }
}