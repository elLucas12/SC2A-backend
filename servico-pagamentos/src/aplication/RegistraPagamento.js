import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoPagamentos } from '../domain/ServicoPagamentos';

@Injectable()
@Dependencies(ServicoPagamentos)
export class RegistraPagamentoUC {
    constructor (servicoPagamentos) {
        validate(servicoPagamentos, ServicoPagamentos);
        this.servicoPagamentos = servicoPagamentos;
    }

    run(dados) {
        return this.servicoPagamentos.registrarPagamento(dados);
    }
}