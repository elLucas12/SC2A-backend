import { Injectable } from "@nestjs/common";
import { IRepositoryMem } from "../domain/repositories/IRepositoryMem";
import { ClienteEntity } from "../domain/entities/ClienteEntity";
import { validate } from "bycontract";

/**
 * Repositório de gerenciamento de dados em memória de clientes dentro do sistema.
 */
@Injectable()
export class ClientesRepository extends IRepositoryMem {
    /**
     * Array de objetos "ClienteEntity", representando os clientes dentro no sistema.
     */
    #clientes;

    constructor() {
        super();
        this.#clientes = [];
    }

    /**
     * Adiciona um Obj. de cliente na memória do sistema.
     *
     * @param {ClienteEntity} cliente Objeto de cliente a ser adicionado.
     */
    adicionar(cliente) {
        validate(cliente, ClienteEntity);
        this.#clientes.push(cliente);
    }

    /**
     * Atualiza os dados (substitui) de um Obj. cliente presente no sistema.
     *
     * @param {ClienteEntity} cliente Objeto de cliente a ser substituido.
     * @return 'true' caso sucesso e 'false' caso o cliente não exista na memória.
     */
    atualizar(cliente) {
        validate(cliente, ClienteEntity);
        for (let i = 0; i < this.#clientes.length; i++) {
            if (this.#clientes[i].codigo === cliente.codigo) {
                this.#clientes[i] = cliente;
                return true;
            }
        }
        return false;
    }

    /**
     * Remove uma instância de cliente presente na memória do sistema.
     *
     * @param {Number} codigo Código da cliente a ser removida da memória.
     * @return 'true' em caso de sucesso e 'false' caso não seja encontrado em mem.
     */
    remover(codigo) {
        for (let i = 0; i < this.#clientes.length; i++) {
            if (this.#clientes[i].codigo === codigo) {
                this.#clientes.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * Consulta na memória do sistema a existência de uma cliente.
     *
     * @param {Number} codigo Código da cliente a ser consultada.
     * @return Objeto de cliente baseado no código e 'undefined' em caso de falha.
     */
    consultar(codigo) {
        return this.#clientes.find((item) => item.codigo === codigo);
    }
}
