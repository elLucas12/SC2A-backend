import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";

import { PagamentoEntityORM } from "./entities/PagamentoEntity";
import { IPagamentosRepository } from "../domain/repositories/IPagamentosRepository";
import { AssinaturaEntity } from "../domain/entities/AssinaturaEntity";
import { PagamentoEntity } from "../domain/entities/PagamentoEntity";
import { Observer } from "../domain/Observer";

/**
 * Repositório de gerenciamento de dados de pagamentos armazenados no banco do sistema 
 * por meio do ORM.
 */
@Injectable()
@Dependencies(getRepositoryToken(PagamentoEntityORM))
export class PagamentosRepositoryORM extends IPagamentosRepository {
    /**
     * Array de objetos "PagamentoEntityORM", representando os usuários armazenados no sistema.
    */
    #pagamentos;

    /**
     * Armazena os objetos que devem ser notificados em caso de alteração nos dados.
     */
    #observers;

    constructor(itens) {
        super();
        this.#pagamentos = itens;
        this.#observers = [];
    }

    /**
     * Registra uma instância de pagamento no banco.
     * 
     * @param {PagamentoEntityORM} pagamento Objeto da entidade Pagamento a ser armazenada.
     * @return Status de sucesso da ação.
     */
    async registrar(pagamento) {
        return await this.#pagamentos.save(pagamento);
    }

    /**
     * Deleta uma instância Pagamento no banco.
     * 
     * @param {Number} codigo Código do pagamento a ser deletado.
     * @return Status de sucesso da ação de deleção.
     */
    async deletar(codigo) {
        return await this.#pagamentos.delete(codigo);
    }

    /**
     * Recupera e constrói todas as instâncias PagamentoEntity armazenadas no sistema.
     * 
     * @return Lista com todos os pagamentos registrados, em forma de objeto já construido.
     */
    async todos() {
        const resp = await this.#pagamentos.find();
        return resp.map(PagamentosRepositoryORM.createFromObject);
    }

    /**
     * Recebe os parâmetros de origem da entidade Pagamento e retorna o objeto construido.
     * 
     * @param {*} param0 Parâmetros de construção da entidade Pagamento.
     * @return Retorna o objeto PagamentoEntity construido.
     */
    static createFromObject({ codigo, codAssinatura, valorPago, dataPagamento }) {
        let assinaturaEntityModel = new AssinaturaEntity(
            codAssinatura.codigo, 
            codAssinatura.codApp, 
            codAssinatura.codCli, 
            codAssinatura.inicioVigencia, 
            codAssinatura.fimVigencia
        );
        let pagamentoEntityModel = new PagamentoEntity(
            codigo, 
            assinaturaEntityModel,
            valorPago,
            dataPagamento
        )
        return pagamentoEntityModel;
    }

    /**
     * Registra as observadores devem ser notificados por esta instância de repo.
     * 
     * @param {Observer} observer Obj. observador desta instância.
     */
    registraObserver(observer) {
        validate(observer, Observer);
        this.#observers.push(observer);
    }

    /**
     * Notifica os observadores registrado nesta instância sobre um pagamento.
     * 
     * @param {Number} codAssinatura Código da assinatura relacionada ao pagamento.
     */
    async notificaObservers(codAssinatura) {
        this.#observers.forEach(obs => obs.notifica(codAssinatura));
    }
}
