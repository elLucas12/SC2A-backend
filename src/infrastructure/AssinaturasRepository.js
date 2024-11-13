import { Injectable } from "@nestjs/common"
import { IRepository } from "../domain/repositories/IRepository";
import { AssinaturaEntity } from "../domain/entities/AssinaturaEntity";
import { validate } from "bycontract";

/**
 * Repositório de gerenciamento de dados em memória das assinaturas de aplicativos.
 */
@Injectable()
export class AssinaturasRepository extends IRepository {
    /**
     * Array de objetos "AssinaturaEntity", representando as assinaturas armazenadas no sistema.
     */
    #assinaturas;

    constructor() {
        super();
        this.#assinaturas = [];
    }

    /**
     * Adiciona um Obj. de assinatura na memória do sistema.
     *
     * @param {AssinaturaEntity} assinatura Objeto de assinatura a ser adicionado.
     */
    adicionar(assinatura) {
        validate(assinatura, AssinaturaEntity);
        this.#assinaturas.push(assinatura);
    }

    /**
     * Atualiza os dados (substitui) de um Obj. assinatura presente no sistema.
     *
     * @param {AssinaturaEntity} assinatura Objeto de assinatura a ser substituido.
     * @returns 'true' em caso de sucesso e 'false' caso index não exista na memória.
     */
    atualizar(assinatura) {
        validate(assinatura, AssinaturaEntity);
        for (let i = 0; i < this.#assinaturas.length; i++) {
            if (this.#assinaturas[i].codigo === assinatura.codigo) {
                this.#assinaturas[i] = assinatura;
                return true;
            }
        }
        return false;
    }

    /**
     * Remove uma instância de assinatura presente na memória do sistema.
     *
     * @param {Number} codigo Código da assinatura a ser removida da memória.
     * @returns 'true' em caso de sucesso e 'false' caso não seja encontrado em mem.
     */
    remover(codigo) {
        for (let i = 0; i < this.#assinaturas.length; i++) {
            if (this.#assinaturas[i].codigo === codigo) {
                this.#assinaturas.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * Consulta na memória do sistema a existência de uma assinatura.
     *
     * @param {Number} codigo Código da assinatura a ser consultada.
     * @returns Objeto de assinatura baseado no código e 'undefined' em caso de falha.
     */
    consultar(codigo) {
        return this.#assinaturas.find((item) => item.codigo === codigo);
    }
}
