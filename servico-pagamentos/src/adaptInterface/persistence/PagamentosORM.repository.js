import { IPagamentosModelRepository } from "../../domain/repositories/IPagamentosModel.repository";
import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pagamento } from "./Pagamento.entity";
import { PagamentoModel } from "../../domain/entidades/Pagamento.model";

@Injectable()
@Dependencies(getRepositoryToken(Pagamento))
export class PagamentosRepositoryORM extends IPagamentosModelRepository {
    #pagamentosRepo;

    constructor(pagamentos) {
        super();
        this.#pagamentosRepo = pagamentos;
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
        return( new PagamentoModel(
            codigo, 
            assinatura,
            valorPago,
            dataPagamento
        ));
    }
}