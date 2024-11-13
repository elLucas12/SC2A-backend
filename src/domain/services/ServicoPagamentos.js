import { Injectable, Dependencies } from "@nestjs/common";
import { PagamentosRepository } from "../../infrastructure/PagamentosRepository";
import { PagamentoEntity } from "../entities/PagamentoEntity";
import { validate } from "bycontract";

@Injectable()
@Dependencies(PagamentosRepository)
export class ServicoPagamentos {
    #pagamentosRepository;

    constructor(pagamentosRepository) {
        validate(pagamentosRepository, PagamentosRepository);
        this.#pagamentosRepository = pagamentosRepository;
        this.#pagamentosRepository.registraObserver();
    }

    /**
     * Registra um pagamento no repositório de dados do sistema.
     * 
     * @param {PagamentoEntity} pagamento Obj. de pagamento a ser registrado.
     */
    registraPagamento(pagamento) {
        validate(pagamento, PagamentoEntity);
        this.#pagamentosRepository.adicionar(pagamento);
        this.#pagamentosRepository.notificaObservers(pagamento.codAssinatura);
    }
}