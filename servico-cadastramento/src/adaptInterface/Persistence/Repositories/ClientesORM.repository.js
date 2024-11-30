import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Cliente } from '../Entities/Cliente.entity';
import { IClientesModelRepository } from '../../../domain/repositories/IClientesModel.repository';
import { ClienteModel } from '../../../domain/entities/Cliente.model';

@Injectable()
@Dependencies(getRepositoryToken(Cliente))
export class ClientesRepositoryORM extends IClientesModelRepository {
    /**
     * Array de objetos ClienteEntity, representando os clientes armazenados no sistema.
    */
    #clientes;

    constructor(itens) {
        super();
        this.#clientes = itens;
    }

    /**
     * Registra uma instância de cliente no banco.
     * 
     * @param {Cliente} cliente Objeto da entidade Cliente a ser armazenada.
     * @return Status de sucesso da ação.
     */
    async registrar(cliente) {
        const resp = await this.#clientes.save(cliente);
        return ClientesRepositoryORM.createFromObject(resp);
    }

    /**
     * Deleta uma instância Cliente no banco.
     * 
     * @param {Number} codigo Referência do cliente a ser deletado.
     * @return Objeto Cliente construido (ClienteEntity).
     */
    async deletar(codigo) {
        const resp = await this.#clientes.delete(codigo);
        return ClientesRepositoryORM.createFromObject(resp);
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
        let clientEntityModel = new ClienteModel(codigo, nome, email);
        return clientEntityModel;
    }
}
