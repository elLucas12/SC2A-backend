import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { IUsuariosModelRepository } from '../../../domain/repositories/IUsuariosModel.repository';
import { Usuario } from '../Entities/Usuario.entity';
import { UsuarioModel } from '../../../domain/entities/Usuario.model';

@Injectable()
@Dependencies(getRepositoryToken(Usuario))
export class UsuariosRepositoryORM extends IUsuariosModelRepository {
    #usuariosRepo;

    constructor(usuarios){
        super();
        this.#usuariosRepo = usuarios;
    }

    /**
     * Registra uma instância de usuário no banco.
     * 
     * @param {Usuario} usuario Objeto da entidade Usuário a ser armazenada.
     * @return Status de sucesso da ação.
     */
    async registrar(usuario) {
        const resp = await this.#usuariosRepo.save(usuario);
        return UsuariosRepositoryORM.createFromObject(resp);
    }

    /**
     * Deleta uma instância Usuário no banco.
     * 
     * @param {String} usuario Nome de usuário do usuário a ser deletado.
     * @return Status de sucesso da ação de deleção.
     */
    async deletar(usuario) {
        const resp = await this.#usuariosRepo.delete(usuario);
        return UsuariosRepositoryORM.createFromObject(resp);
    }

    /**
     * Recupera e constrói todas as instâncias UsuarioEntity armazenadas no sistema.
     * 
     * @return Lista com todos os usuários registrados, em forma de objeto já construido.
     */
    async todos() {
        const resp = await this.#usuariosRepo.find();
        return resp.map(UsuariosRepositoryORM.createFromObject);
    }

    /**
     * Recebe os parâmetros de origem da entidade Usuário e retorna o objeto construido.
     * 
     * @param {*} param0 Parâmetros de construção da entidade Usuário.
     * @return Retorna o objeto UsuarioEntity construido.
     */
    static createFromObject({ usuario, senha }) {
        return new UsuarioModel(usuario, senha);
    }
}
