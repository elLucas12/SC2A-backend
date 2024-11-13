import { Injectable } from "@nestjs/common";
import { validate } from "bycontract";
import { IPagamentosRepository } from "../domain/repositories/IPagamentosRepository"
import { PagamentoEntity } from "../domain/entities/PagamentoEntity";
import { Observer } from "../domain/Observer";

/**
 * Repositório de gerenciamento de dados de instâncias de pagamento.
 */
@Injectable()
export class PagamentosRepository extends IPagamentosRepository {
    /**
     * Array de objetos "PagamentoEntity", representando as pagamentos armazenados no sistema.
     */
    #pagamentos;

    /**
     * Armazena os objetos que devem ser notificados em caso de alteração nos dados.
     */
    #observers;

    constructor() {
        super();
        this.#pagamentos = [];
        this.#observers = [];
    }

    /**
     * Registra as observadores devem ser notificados por esta instância de repo.
     * 
     * @param {Observer} observer Obj. observador desta instância.
     */
    registraObserver(observer) {
        validate(observer, Observer);
        this.#observers.push(observer);
    }

    /**
     * Notifica os observadores registrado nesta instância sobre um pagamento.
     * 
     * @param {Number} codAssinatura Código da assinatura relacionada ao pagamento.
     */
    async notificaObservers(codAssinatura) {
        this.#observers.forEach(obs => obs.notifica(codAssinatura));
    }

    /**
     * Adiciona um Obj. de pagamento na memória do sistema.
     *
     * @param {PagamentoEntity} pagamento Objeto de pagamento a ser adicionado.
     */
    adicionar(pagamento) {
        validate(pagamento, PagamentoEntity);
        this.#pagamentos.push(pagamento);
    }

    /**
     * Atualiza os dados (substitui) de um Obj. pagamento presente no sistema.
     *
     * @param {PagamentoEntity} pagamento Objeto de pagamento a ser substituido.
     * @return 'true' em caso de sucesso e 'false' caso index não exista na memória.
     */
    atualizar(pagamento) {
        validate(pagamento, PagamentoEntity);
        for (let i = 0; i < this.#pagamentos.length; i++) {
            if (this.#pagamentos[i].codigo === pagamento.codigo) {
                this.#pagamentos[i] = pagamento;
                return true;
            }
        }
        return false;
    }

    /**
     * Remove uma instância de pagamento presente na memória do sistema.
     *
     * @param {Number} codigo Código da pagamento a ser removida da memória.
     * @return 'true' em caso de sucesso e 'false' caso não seja encontrado em mem.
     */
    remover(codigo) {
        for (let i = 0; i < this.#pagamentos.length; i++) {
            if (this.#pagamentos[i].codigo === codigo) {
                this.#pagamentos.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * Consulta na memória do sistema a existência de uma pagamento.
     *
     * @param {Number} codigo Código da pagamento a ser consultada.
     * @return Objeto de pagamento baseado no código e 'undefined' em caso de falha.
     */
    consultar(codigo) {
        return this.#pagamentos.find((item) => item.codigo === codigo);
    }
}
