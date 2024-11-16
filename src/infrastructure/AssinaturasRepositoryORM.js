import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";

import { IAssinaturasRepository } from "../domain/repositories/IAssinaturasRepository";
import { AssinaturaEntityORM } from "./entities/AssinaturaEntity";
import { AssinaturaEntity } from "../domain/entities/AssinaturaEntity";
import { AplicativoEntity } from "../domain/entities/AplicativoEntity";
import { ClienteEntity } from "../domain/entities/ClienteEntity";

/**
 * Representa o tipo de assinatura dentro do contexto de válidade das regras de negócio.
 */
export const TipoConsultaAssinatura = {
    TODAS: Symbol('todas'),
    ATIVAS: Symbol('ativas'),
    CANCELADAS: Symbol('canceladas')
};

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
     * @param {AssinaturaEntityORM} assinatura Objeto da entidade Assinatura a ser armazenada.
     * @return Objeto Assinatura construido (AssinaturaEntity).
     */
    async registrar(assinatura) {
        const resp = await this.#assinaturas.save(assinatura);
        return AssinaturasRepositoryORM.createFromObject(resp);
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
     * Consulta uma Assinatura através do código da mesma no banco.
     * 
     * @param {Number} codigo Referência chave da assinatura
     * @returns Obj. AssinaturaEntity pesquisado.
     */
    async consultarPorCodigo(codigo) {
        const resp = await this.#assinaturas.findOneBy({codigo});
        return AssinaturasRepositoryORM.createFromObject(resp);
    }

    /**
     * Consulta todas as assinaturas presentes no sistemas conforme o tipo passado.
     * 
     * @param {TipoConsultaAssinatura} tipo Tipo de assinatura a ser consultada.
     * @return Obj. com todas as assinaturas conforme o tipo ou 'undefined' caso tipo != TipoConsulta.
     */
    async consultarPorTipo(tipo) {
        let resp;
        switch (tipo) {
            case TipoAssinatura.TODAS:
                return this.todos();
            case TipoAssinatura.ATIVAS:
                resp = this.#assinaturas.find(
                    (item) => new Date(item.fimVigencia).getTime() > new Date().getTime()
                );
                break;
            case TipoAssinatura.CANCELADAS:
                resp = this.#assinaturas.find(
                    (item) => new Date(item.fimVigencia).getTime() <= new Date().getTime()
                );
                break;
            default:
                return undefined;
        }
        return resp.map(AssinaturasRepositoryORM.createFromObject);
    }

    /**
     * Consulta e retorna todas as assinaturas referentes ao cliente passado.
     * 
     * @param {Number} codigo Código de referência do cliente.
     * @return Objeto com todas as assinaturas do cliente.
     */
    async consultarPorCliente(codigo) {
        const resp = this.#assinaturas.find((item) => item.codCli.codigo === codigo);
        return resp.map(AssinaturasRepositoryORM.createFromObject);
    }

    /**
     * Consulta e retorna todas as assinaturas referentes ao aplicativo passado.
     * 
     * @param {Number} codigo Código de referência do aplicativo.
     * @return Objeto com todas as assinaturas do aplicativo.
     */
    async consultarPorAplicativo(codigo) {
        const resp = this.#assinaturas.find((item) => item.codApp.codigo === codigo);
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