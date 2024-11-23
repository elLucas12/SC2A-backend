import { Observer } from "../Observer";

class ServicoAssinaturasValidas extends Observer {
    /**
     * Array de objetos "Assiantura" para formação de armazenamento cache direto no obj.
     */
    #cache;

    constructor() {
        this.#cache = [];
    }

    /**
     * Ações ao receber notificação do Observer registrado (PagamentosRepo).
     * 
     * Fundamentalmente, realiza-se verificações de existência da assinatura e 
     * altera-se a válidade da mesma conforme pagamento.
     * 
     * @param {Number} assinatura Código de assinatura relacionada ao pagamento.
     */
    notifica(assinatura) {
        this.#cache = this.#cache.filter((item) => item.codigo !== assinatura.codigo);
    }
}