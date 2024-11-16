import { Injectable, Dependencies } from "@nestjs/common";
import { Observer } from "../Observer";
import { AplicativosRepositoryORM } from "../../infrastructure/AplicativosRepositoryORM";
import { AssinaturasRepositoryORM } from "../../infrastructure/AssinaturasRepositoryORM";
import { ClientesRepositoryORM } from "../../infrastructure/ClientesRepositoryORM";
import { UsuariosRepositoryORM } from "../../infrastructure/UsuariosRepositoryORM";

/**
 * Serviço de manunteção de cadastros e de operações relativas à cobrança.
 */
@Injectable()
@Dependencies(
    AssinaturasRepositoryORM, 
    ClientesRepositoryORM, 
    AplicativosRepositoryORM, 
    UsuariosRepositoryORM
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
     * Retorna todos os clientes cadastrados no sistema.
     * 
     * @return Obj. com os clientes cadastrados.
     */
    async clientesCadastrados() {
        return this.#clientesRepository.todos();
    }

    /**
     * Retorna todos os aplicativos cadastrados no sistema.
     * 
     * @return Objeto com todos os aplicativos cadastrados.
     */
    async aplicativosCadastrados() {
        return this.#aplicativosRepository.todos();
    }

    /**
     * Registra uma instância de assinatura no sistema.
     * 
     * @param {AssinaturaEntityORM} assinatura Obj. de assinatura para registro.
     * @return Obj. de entidade Assinatura construido (AssinaturaEntity).
     */
    async criarAssinatura(assinatura) {
        return this.#assinaturasRepository.registrar(assinatura);
    }

    /**
     * Procura e altera o custo mensal de um aplicativo registrado no sistema através
     * de seu código de referência.
     * 
     * @param {Number} codigo Código de referência do aplicativo.
     * @param {Number} custo Custo novo a ser definido.
     * @return Obj. AplicativoEntity da instância atualizada.
     */
    async atualizarCusto(codigo, custo) {
        return this.#aplicativosRepository.atualizarCusto(codigo, custo);
    }

    /**
     * Consulta todas as assinaturas presentes no sistemas conforme o tipo passado.
     * 
     * @param {TipoConsultaAssinatura} tipo Tipo de assinatura a ser consultada.
     * @return Obj. com todas as assinaturas conforme o tipo.
     */
    async assinaturasTipo(tipo) {
        return this.#assinaturasRepository.consultarPorTipo(tipo);
    }

    /**
     * Consulta todas as assinaturas do cliente presentes no banco de dados do sistema.
     * 
     * @param {Number} codigo Referência do cliente no banco.
     * @return Objeto de representação das assinaturas do cliente.
     */
    async assinaturasCliente(codigo) {
        return this.#assinaturasRepository.consultarPorCliente(codigo);
    }

    /**
     * Consulta todas as assinaturas do aplicativo presentes no banco de dados do sistema.
     * 
     * @param {Number} codigo Referência do aplicativo no banco.
     * @return Objeto de representação dos aplicativos relacionados.
     */
    async assinaturasAplicativo(codigo) {
        return this.#assinaturasRepository.consultarPorAplicativo(codigo);
    }
}
