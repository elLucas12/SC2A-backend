import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";

import { IUsuariosRepository } from "../domain/repositories/IUsuariosRepository";
import { UsuarioEntityORM } from "./entities/UsuarioEntity";
import { UsuarioEntity } from "../domain/entities/UsuarioEntity";

/**
 * Repositório de gerenciamento de dados das entidades de Usuário armazenados no banco 
 * do sistema por meio do ORM.
 */
@Injectable()
@Dependencies(getRepositoryToken(UsuarioEntityORM))
export class UsuariosRepositoryORM extends IUsuariosRepository {
    /**
     * Array de objetos "UsuarioEntityORM", representando os usuários armazenados no sistema.
    */
    #usuarios;

    constructor(itens) {
        super();
        this.#usuarios = itens;
    }

    /**
     * Registra uma instância de usuário no banco.
     * 
     * @param {UsuarioEntityORM} usuario Objeto da entidade Usuário a ser armazenada.
     * @return Status de sucesso da ação.
     */
    async registrar(usuario) {
        return await this.#usuarios.save(usuario);
    }

    /**
     * Deleta uma instância Usuário no banco.
     * 
     * @param {String} usuario Nome de usuário do usuário a ser deletado.
     * @return Status de sucesso da ação de deleção.
     */
    async deletar(usuario) {
        return await this.#usuarios.delete(usuario);
    }

    /**
     * Recupera e constrói todas as instâncias UsuarioEntity armazenadas no sistema.
     * 
     * @return Lista com todos os usuários registrados, em forma de objeto já construido.
     */
    async todos() {
        const resp = await this.#usuarios.find();
        return resp.map(UsuariosRepositoryORM.createFromObject);
    }

    /**
     * Recebe os parâmetros de origem da entidade Usuário e retorna o objeto construido.
     * 
     * @param {*} param0 Parâmetros de construção da entidade Usuário.
     * @return Retorna o objeto UsuarioEntity construido.
     */
    static createFromObject({ usuario, senha }) {
        let usuarioEntityModel = new UsuarioEntity(usuario, senha);
        return usuarioEntityModel;
    }
}
