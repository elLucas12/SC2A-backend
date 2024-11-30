import { Injectable, Dependencies } from '@nestjs/common';
import { validate } from 'bycontract';
import { EventoModel } from './events/EventoModel.event';
import { PagamentosRepositoryORM } from '../adaptInterface/persistence/PagamentosORM.repository';
import { EventoPagamentoServicoCadastramento } from './events/PagamentoServicoCadastramento.event';
import { EventoPagamentoServicoAssinaturasValidas } from './events/PagamentoServicoAssinaturasValidas.event';

@Injectable()
@Dependencies('FILAPAGAMENTO', PagamentosRepositoryORM)
export class ServicoPagamentos {
    #cliente;
    #pagamentoRepository;

    constructor(cliente, pagamentoRepository) {
        this.#cliente = cliente;
        this.#pagamentoRepository = pagamentoRepository;
    }

    /**
     * Recebe um objeto de evento e adiciona na fila do event broker.
     * 
     * @param {EventoModel} evento Objeto de evento a ser emitido ao broker.
     */
    emitirEvento(evento) {
        validate(evento, EventoModel);
        this.#cliente.emit(evento.pattern, evento.payload);
    }

    /**
     * Registra no sistema uma instância de Pagamento e retorna o objeto modelo respectivo.
     * 
     * São emitidos alertas para o ServicoCadastramento, com as informações do ID de assinatura,
     * com o valor pago e com a respectiva data. Também são emitido alertas para o microsserviço
     * ServicoAssinaturasValidas, que recebe apenas o ID da assinatura para realizar atualização
     * de cache, isso conforme as regras de nogócio definidas.
     * 
     * @param {Pagamento} pagamento Objeto da entidade Pagamento.
     * @return Objeto modelo da entidade Pagamento registrada.
     */
    registrarPagamento(pagamento) {
        let resp = this.#pagamentoRepository.registrar(pagamento);
        if (resp !== undefined) {
            // Emite alerta de evento para ServicoCadastramento
            this.emitirEvento(new EventoPagamentoServicoCadastramento({
                assinatura: pagamento.assinatura,
                valorPago: pagamento.valorPago,
                dataPagamento: pagamento.dataPagamento
            }));
            // Emite alerta de evento para ServicoAssinaturasValidas
            this.emitirEvento(new EventoPagamentoServicoAssinaturasValidas({
                assinatura: pagamento.assinatura
            }))
        }
        return resp;
    }
}