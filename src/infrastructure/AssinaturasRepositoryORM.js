import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";

import { IAssinaturasRepository } from "../domain/repositories/IAssinaturasRepository";
import { AssinaturaEntityORM } from "./entities/AssinaturaEntity";
import { AssinaturaEntity } from "../domain/entities/AssinaturaEntity";
import { AplicativoEntity } from "../domain/entities/AplicativoEntity";
import { ClienteEntity } from "../domain/entities/ClienteEntity";

/**
 * Repositório de gerenciamento de dados das assinaturas armazenadas no banco do sistema por
 * meio de ORM.
 *
 * Instâncias deste tipo apresenta relacionamento 1 para n com as entidades Aplicativo
 * e Cliente.
 */
@Injectable()
@Dependencies(getRepositoryToken(AssinaturaEntityORM))
export class AssinaturasRepositoryORM extends IAssinaturasRepository {
    /**
     * Array de objetos "AssinaturaEntityORM", representando as assinaturas armazenadas no sistema.
    */
    #assinaturas;

    constructor(itens) {
        super();
        this.#assinaturas = itens;
    }

    /**
     * Registra uma instância de assinatura no banco.
     * 
     * @param {AssinaturaEntityORM} assiantura Objeto da entidade Assinatura a ser armazenada.
     * @return Status de sucesso da ação.
     */
    async registrar(assinatura) {
        return await this.#assinaturas.save(assinatura);
    }

    /**
     * Deleta uma instância de Assinatura no banco.
     * 
     * @param {Number} codigo Referência da assinatura a ser deletada.
     * @return Status de sucesso da ação de deleção.
     */
    async deletar(codigo) {
        return await this.#assinaturas.delete(codigo);
    }

    /**
     * Recupera e constrói todos os "AssinaturaEntity" armazenados no sistema.
     * 
     * @return Lista com todas as assinaturas registrados, em forma de objeto já construido.
     */
    async todos() {
        const resp = await this.#assinaturas.find();
        return resp.map(AssinaturasRepositoryORM.createFromObject);
    }

    /**
     * Recebe os parâmetros de origem da entidade Assinatura e retorna o objeto construido.
     * 
     * @param {*} param0 Parâmetros de construção da entidade Assinatura.
     * @return Retorna o objeto AssinaturaEntity construido.
     */
    static createFromObject({ codigo, codApp, codCli, inicioVigencia, fimVigencia }) {
        let aplicativoModel = new AplicativoEntity(codApp.codigo, codApp.nome, codApp.custoMensal);
        let clienteModel = new ClienteEntity(codCli.codigo, codCli.nome, codCli.email);
        let assinaturaEntityModel = new AssinaturaEntity(codigo, aplicativoModel, clienteModel, inicioVigencia, fimVigencia);
        return assinaturaEntityModel;
    }
}