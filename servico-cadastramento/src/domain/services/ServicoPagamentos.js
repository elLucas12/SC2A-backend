import { Injectable, Dependencies } from '@nestjs/common';
import { PagamentosRepositoryORM } from '../../adaptInterface/Persistence/Repositories/PagamentosORM.repository';

@Injectable()
@Dependencies(PagamentosRepositoryORM)
export class ServicoPagamentos {
    #pagamentosRepository;

    constructor (pagamentosRepository) {
        this.#pagamentosRepository = pagamentosRepository;
    }

    /**
     * Registra os Observers conforme as regras de negócio no repositório de pagamentos
     * (PagamentosRepositoryORM) do serviço.
     * 
     * @param {Observer} observer Objeto a ser registrado como observador do evento.
     */
    registraObservers(observer) {
        this.#pagamentosRepository.registraObserver(observer);
    }

    /**
     * Registra uma instância de Pagamento no repositório de dados do sistema de pagamentos.
     * 
     * O método verifica também se o registro foi feito com sucesso para, então, realizar a
     * notificação dos objetos Observer registrados no serviço para observação de eventos.
     * 
     * @param {Pagamento} pagamento Classe modelo da entidade de pagamento a ser registrada.
     * @return Classe modelo completa do pagamento registrado.
     */
    registraPagamento(pagamento) {
        const resp = this.#pagamentosRepository.registrar(pagamento);
        if (resp !== undefined) // obs: notificação é feita sem o codigo de pagamento.
            this.#pagamentosRepository.notificaObservers(pagamento);
        return resp;
    }
}