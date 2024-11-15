import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";

import { IAplicativosRepository } from "../domain/repositories/IAplicativosRepository";
import { AplicativoEntityORM } from "./entities/AplicativoEntity";
import { AplicativoEntity } from "../domain/entities/AplicativoEntity";

/**
 * Repositório de gerenciamento de dados dos aplicativos armazenados no banco do sistema por
 * meio de ORM.
 */
@Injectable()
@Dependencies(getRepositoryToken(AplicativoEntityORM))
export class AplicativosRepositoryORM extends IAplicativosRepository {
    /**
     * Array de objetos "AplicativoEntityORM", representando os aplicativos armazenadas no sistema.
     */
    #aplicativos;

    constructor(itens) {
        super();
        this.#aplicativos = itens;
    }

    /**
     * Registra uma instância de aplicativo no banco.
     * 
     * @param {AplicativoEntityORM} aplicativo Objeto da entidade Aplicativo a ser armazenada.
     * @return Status de sucesso da ação.
     */
    async registrar(aplicativo) {
        return await this.#aplicativos.save(aplicativo);
    }

    /**
     * Deleta uma instância de aplicativo no banco.
     * 
     * @param {Number} codigo Referência do aplicativo a ser deletado.
     * @return Status de sucesso da ação de deleção.
     */
    async deletar(codigo) {
        return await this.#aplicativos.delete(codigo);
    }

    /**
     * Recupera e constrói todos os AplicativosEntity armazenados no sistema.
     * 
     * @return Lista com todos os aplicativos registrados, em forma de objeto já construido.
     */
    async todos() {
        const resp = await this.#aplicativos.find();
        return resp.map(AplicativosRepositoryORM.createFromObject);
    }

    /**
     * Consulta instâncias de Aplicativo dentro do banco através do código de referência.
     * 
     * @param {Number} codigo Código de referência do aplicativo a ser consultado.
     * @return Lista/Unidade de obj. consultado.
     */
    async consultarPorCodigo(codigo) {
        const resp = await this.#aplicativos.find((item) => item.codigo === codigo);
        return resp.map(AplicativosRepositoryORM.createFromObject);
    }

    /**
     * Recebe os parâmetros de origem da entidade Aplicativo e retorna o objeto construido.
     * 
     * @param {*} param0 Parâmetros de construção da entidade Aplicativo.
     * @return Retorna o objeto AplicativoEntity construido.
     */
    static createFromObject({ codigo, nome, custoMensal }) {
        let aplicativoEntityModel = new AplicativoEntity(codigo, nome, custoMensal);
        return aplicativoEntityModel;
    }
}
