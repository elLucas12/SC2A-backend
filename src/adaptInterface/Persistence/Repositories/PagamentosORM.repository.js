import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Pagamento } from '../Entities/Pagamento.entity';
import { IPagamentosModelRepository } from '../../../domain/repositories/IPagamentosModel.repository';
import { AssinaturaModel } from '../../../domain/entities/Assinatura.model';
import { PagamentoModel } from '../../../domain/entities/Pagamento.model';
import { AplicativoModel } from '../../../domain/entities/Aplicativo.model';
import { ClienteModel } from '../../../domain/entities/Cliente.model';

import { Observer } from '../../../domain/Observer';

/**
 * Repositório de gerenciamento de dados de pagamentos armazenados no banco do sistema 
 * por meio do ORM.
 */
@Injectable()
@Dependencies(getRepositoryToken(Pagamento))
export class PagamentosRepositoryORM extends IPagamentosModelRepository {
    /**
     * Array de objetos "PagamentoEntityORM", representando os usuários armazenados no sistema.
    */
    #pagamentosRepo;

    /**
     * Armazena os objetos que devem ser notificados em caso de alteração nos dados.
     */
    #observers;

    constructor(pagamentos) {
        super();
        this.#pagamentosRepo = pagamentos;
        this.#observers = [];
    }

    /**
     * Registra uma instância de pagamento no banco.
     * 
     * @param {Pagamento} pagamento Objeto da entidade Pagamento a ser armazenada.
     * @return Objeto Pagamento construido (PagamentoEntity).
     */
    async registrar(pagamento) {
        const resp = await this.#pagamentosRepo.save(pagamento);
        return PagamentosRepositoryORM.createFromObject(resp);
    }

    /**
     * Deleta uma instância Pagamento no banco.
     * 
     * @param {Number} codigo Código do pagamento a ser deletado.
     * @return Objeto Pagamento construido (PagamentoEntity).
     */
    async deletar(codigo) {
        const resp = await this.#pagamentosRepo.delete(codigo);
        return PagamentosRepositoryORM.createFromObject(resp);
    }

    /**
     * Recupera e constrói todas as instâncias PagamentoEntity armazenadas no sistema.
     * 
     * @return Lista com todos os pagamentos registrados, em forma de objeto já construido.
     */
    async todos() {
        const resp = await this.#pagamentosRepo.find();
        return resp.map(PagamentosRepositoryORM.createFromObject);
    }

    /**
     * Recebe os parâmetros de origem da entidade Pagamento e retorna o objeto construido.
     * 
     * @param {*} param0 Parâmetros de construção da entidade Pagamento.
     * @return Retorna o objeto PagamentoEntity construido.
     */
    static createFromObject({ codigo, assinatura, valorPago, dataPagamento }) {
        let aplicativoEntityModel = new AplicativoModel(
            assinatura.aplicativo.codigo,
            assinatura.aplicativo.nome,
            assinatura.aplicativo.custoMensal
        );
        let clienteEntityModel = new ClienteModel(
            assinatura.cliente.codigo,
            assinatura.cliente.nome,
            assinatura.cliente.email
        );
        let assinaturaEntityModel = new AssinaturaModel(
            assinatura.codigo, 
            aplicativoEntityModel, 
            clienteEntityModel, 
            assinatura.inicioVigencia, 
            assinatura.fimVigencia
        );
        let pagamentoEntityModel = new PagamentoModel(
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
     * @param {Number} assinatura Código da assinatura relacionada ao pagamento.
     */
    async notificaObservers(assinatura) {
        this.#observers.forEach(obs => obs.notifica(assinatura));
    }
}