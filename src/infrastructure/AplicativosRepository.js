import { Injectable } from "@nestjs/common"
import { IRepositoryMem } from "../domain/repositories/IRepositoryMem";
import { AplicativoEntity } from "../domain/entities/AplicativoEntity";
import { validate } from "bycontract";

/**
 * Repositório de gerenciamento de dados em memória dos aplicativos do sistema.
 */
@Injectable()
export class AplicativosRepository extends IRepositoryMem {
    /**
     * Array de objetos "AplicativoEntity", representando as aplicativos armazenadas no sistema.
     */
    #aplicativos;

    constructor() {
        super();
        this.#aplicativos = [];
    }

    /**
     * Adiciona um Obj. de aplicativo na memória do sistema.
     *
     * @param {AplicativoEntity} aplicativo Objeto de aplicativo a ser adicionado.
     */
    adicionar(aplicativo) {
        validate(aplicativo, AplicativoEntity);
        this.#aplicativos.push(aplicativo);
    }

    /**
     * Atualiza os dados (substitui) de um Obj. aplicativo presente no sistema.
     *
     * @param {AplicativoEntity} aplicativo Objeto de aplicativo a ser substituido.
     * @return 'true' em caso de sucesso e 'false' caso index não exista na memória.
     */
    atualizar(aplicativo) {
        validate(aplicativo, AplicativoEntity);
        for (let i = 0; i < this.#aplicativos.length; i++) {
            if (this.#aplicativos[i].codigo === aplicativo.codigo) {
                this.#aplicativos[i] = aplicativo;
                return true;
            }
        }
        return false;
    }

    /**
     * Remove uma instância de aplicativo presente na memória do sistema.
     *
     * @param {Number} codigo Código da aplicativo a ser removida da memória.
     * @return 'true' em caso de sucesso e 'false' caso não seja encontrado em mem.
     */
    remover(codigo) {
        for (let i = 0; i < this.#aplicativos.length; i++) {
            if (this.#aplicativos[i].codigo === codigo) {
                this.#aplicativos.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * Consulta na memória do sistema a existência de uma aplicativo.
     *
     * @param {Number} codigo Código da aplicativo a ser consultada.
     * @return Objeto de aplicativo baseado no código e 'undefined' em caso de falha.
     */
    consultar(codigo) {
        return this.#aplicativos.find((item) => item.codigo === codigo);
    }
}
