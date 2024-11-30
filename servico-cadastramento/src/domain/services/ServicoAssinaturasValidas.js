import { Observer } from "../Observer";

export class ServicoAssinaturasValidas extends Observer {
    /**
     * Array de objetos "Assinatura" para formação de armazenamento cache direto no obj.
     */
    #cache;

    constructor() {
        this.#cache = [];
    }

    /**
     * Ações ao receber notificação do Observer registrado (PagamentosRepo).
     * 
     * Fundamentalmente, realiza-se verificações de existência da assinatura e 
     * altera-se a válidade da mesma conforme o pagamento realizado.
     * 
     * Se não for verificada a existência do atributo 'codigo' no subobjeto da entidade
     * pagamento e, também, não for verifica a existência da chave estrangeira no próprio
     * atributo 'assinatura', o objeto passado como pagamento será comparado com os objetos
     * armazenados no repositório, sendo removido em casos de aceite.
     * 
     * @param {Pagamento} pagamento Objeto modelo do pagamento realizado.
     */
    notifica(pagamento) {
        if (pagamento.assinatura.hasOwnProperty('codigo')) {
            this.#cache = this.#cache.filter((item) => item.codigo !== pagamento.assinatura.codigo);
        } else if (typeof(pagamento.assinatura) === "number") {
            this.#cache = this.#cache.filter((item) => item.codigo !== pagamento.assinatura);
        } else {
            this.#cache = this.#cache.filter((item) => item !== pagamento);
        }
    }
}