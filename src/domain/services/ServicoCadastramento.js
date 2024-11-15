import { Injectable, Dependencies } from "@nestjs/common";
import { validate } from "bycontract";
import { Observer } from "../Observer";
import { AssinaturasRepository } from "../../infrastructure/AssinaturasRepository";
import { ClientesRepository } from "../../infrastructure/ClientesRepository";
import { UsuariosRepository } from "../../infrastructure/UsuariosRepository";
import { AplicativosRepositoryORM } from "../../infrastructure/AplicativosRepositoryORM";

/**
 * Serviço de manunteção de cadastros e de operações relativas à cobrança.
 */
@Injectable()
@Dependencies(
    AssinaturasRepository, 
    ClientesRepository, 
    AplicativosRepositoryORM, 
    UsuariosRepository
)
export class ServicoCadastramento extends Observer {
    #assinaturasRepository;
    #clientesRepository;
    #aplicativosRepository;
    #usuariosRepository;

    constructor(assinaturasRepository, clienteRepository, aplicativosRepository, usuariosRepository) {
        super();
        this.#assinaturasRepository = assinaturasRepository;
        this.#clientesRepository = clienteRepository;
        this.#aplicativosRepository = aplicativosRepository;
        this.#usuariosRepository = usuariosRepository;
    }

    /**
     * Ações ao receber notificação do Observer registrado (PagamentosRepo).
     * 
     * Fundamentalmente, realiza-se verificações de existência da assinatura e 
     * altera-se a válidade da mesma conforme pagamento.
     * 
     * @param {Number} codAssinatura Código de assinatura relacionada ao pagamento.
     */
    notifica(codAssinatura) {
        
    }

    /**
     * Atualiza as informações de preço de uma assinatura.
     * 
     * @param {Number} codigo Código da assinatura a ter o preço atualizada.
     * @param {Number} preco Preço atualizado da assinatura.
     * @returns 'true' em caso de sucesso e 'false' em caso de falha na atualização.
     */
    atualizaPrecoAssinatura(codigo, preco) {
        validate(arguments, ["Number", "Number"]);

        // Consultando assinatura no repo.
        let assinaturaTarget = this.#assinaturasRepository.consultar(codigo);
        if (typeof(assinaturaTarget) === undefined) 
            return false;

        // Atualizando valor
        assinaturaTarget.preco = preco;
        if (this.#assinaturasRepository.atualizar(assinaturaTarget)) {
            return false;
        }

        return true;
    }

    /**
     * Atualiza o estado de válidade de uma assinatura presente no banco do sistema.
     * 
     * @param {Number} codigo Código identificador da assinatura.
     * @param {Boolean} validade Booleano indicador de estado de válidade da assinatura.
     * @returns 'true' em caso de sucesso na troca de válidade e 'false' em caso de falha.
     */
    atualizaValidadeAssinatura(codigo, validade) {
        validate(arguments, ["Number", "Boolean"]);

        // Consultando no repo.
        let assinaturaTarget = this.#assinaturasRepository.consultar(codigo);
        if (typeof(assinaturaTarget) === undefined) {
            return false;
        }

        // Atualizando informação de validade
        assinaturaTarget.validade = validade;
        if (this.#assinaturasRepository.atualizar(assinaturaTarget)) {
            return false;
        }

        return true;
    }
}
