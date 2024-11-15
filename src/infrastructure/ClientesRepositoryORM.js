import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";

import { ClienteEntity } from "../domain/entities/ClienteEntity";
import { IClientesRepository } from "../domain/repositories/IClientesRepository";
import { ClienteEntityORM } from "./entities/ClienteEntity";

/**
 * Repositório de gerenciamento de dados dos Clientes armazenados no banco do sistema por
 * meio de ORM.
 */
@Injectable()
@Dependencies(getRepositoryToken(ClienteEntityORM))
export class ClientesRepositoryORM extends IClientesRepository {
    /**
     * Array de objetos "ClienteEntityORM", representando os clientes armazenados no sistema.
    */
    #clientes;

    constructor(itens) {
        super();
        this.#clientes = itens;
    }

    /**
     * Registra uma instância de cliente no banco.
     * 
     * @param {ClienteEntityORM} cliente Objeto da entidade Cliente a ser armazenada.
     * @return Status de sucesso da ação.
     */
    async registrar(cliente) {
        return await this.#clientes.save(cliente);
    }

    /**
     * Deleta uma instância Cliente no banco.
     * 
     * @param {Number} codigo Referência do cliente a ser deletado.
     * @return Status de sucesso da ação de deleção.
     */
    async deletar(codigo) {
        return await this.#clientes.delete(codigo);
    }

    /**
     * Recupera e constrói todas as instâncias ClienteEntity armazenadas no sistema.
     * 
     * @return Lista com todos os clientes registrados, em forma de objeto já construido.
     */
    async todos() {
        const resp = await this.#clientes.find();
        return resp.map(ClientesRepositoryORM.createFromObject);
    }

    /**
     * Recebe os parâmetros de origem da entidade Cliente e retorna o objeto construido.
     * 
     * @param {*} param0 Parâmetros de construção da entidade Cliente.
     * @return Retorna o objeto ClienteEntity construido.
     */
    static createFromObject({ codigo, nome, email }) {
        let clientEntityModel = new ClienteEntity(codigo, nome, email);
        return clientEntityModel;
    }
}