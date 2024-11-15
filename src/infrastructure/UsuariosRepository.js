import { Injectable } from "@nestjs/common";
import { IRepositoryMem } from "../domain/repositories/IRepositoryMem";
import { UsuarioEntity } from "../domain/entities/UsuarioEntity";
import { validate } from "bycontract";

/**
 * Repositório de gerenciamento de dados referentes aos usuários do sistema.
 */
@Injectable()
export class UsuariosRepository extends IRepositoryMem {
    /**
     * Array de objetos "Entity", representando os usuários do sistema de usuarios.
     */
    #usuarios;

    constructor() {
        super();
        this.#usuarios = [];
    }

    /**
     * Adiciona um Obj. de usuário na memória do sistema.
     *
     * @param {UsuarioEntity} Objeto de usuario a ser adicionado.
     */
    adicionar(usuario) {
        validate(usuario, UsuarioEntity);
        this.#usuarios.push(usuario);
    }

    /**
     * Atualiza os dados (substitui) de um Obj. Usuário presente no sistema.
     *
     * @param {UsuarioEntity} usuario Objeto de Usuário a ser substituido.
     * @return 'true' em caso de sucesso e 'false' caso o obj. não exista na mem.
     */
    atualizar(usuario) {
        validate(usuario, UsuarioEntity);
        for (let i = 0; i < this.#usuarios.length; i++) {
            if (this.#usuarios[i].usuario === usuario.usuario) {
                this.#usuarios[i] = usuario;
                return true;
            } 
        }
        return false;
    }

    /**
     * Remove uma instância de usuário presente na memória do sistema.
     *
     * @param {String} usuario Nome de usuario do obj. a ser removido da memória.
     * @return 'true' caso removido com sucesso e 'false' caso não seja encontrado na mem.
     */
    remover(usuario) {
        for (let i = 0; i < this.#usuarios.length; i++) {
            if (this.#usuarios[i].usuario === usuario) {
                this.#usuarios.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * Consulta na memória do sistema a existência de uma usuario.
     *
     * @param {String} usuario Nome de usuário a ser consultado.
     * @return Objeto de Usuário baseado no código ou 'undefined' em caso de falha.
     */
    consultar(usuario) {
        return this.#usuarios.find((item) => item.usuario === usuario);
    }
}
