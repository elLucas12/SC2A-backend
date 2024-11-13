import { Injectable } from "@nestjs/common";
import { IPagamentosRepository } from "../domain/repositories/IPagamentosRepository"
import { PagamentoEntity } from "../domain/entities/PagamentoEntity";
import { validate } from "bycontract";

/**
 * Repositório de gerenciamento de dados de instâncias de pagamento.
 */
@Injectable()
export class PagamentosRepository {
    /**
     * Array de objetos "PagamentoEntity", representando as pagamentos armazenados no sistema.
     */
    #pagamentos;

    constructor() {
        super();
        this.#pagamentos = [];
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
