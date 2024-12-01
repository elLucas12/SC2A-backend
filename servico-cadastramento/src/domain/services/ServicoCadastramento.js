import { Injectable, Dependencies, NotFoundException } from "@nestjs/common";
import { AssinaturasRepositoryORM } from "../../adaptInterface/Persistence/Repositories/AssinaturasORM.repository";
import { ClientesRepositoryORM } from "../../adaptInterface/Persistence/Repositories/ClientesORM.repository";
import { AplicativosRepositoryORM } from "../../adaptInterface/Persistence/Repositories/AplicativosORM.repository";
import { UsuariosRepositoryORM } from "../../adaptInterface/Persistence/Repositories/UsuariosORM.repository";
import { ValorInvalidoPagamento } from "../../adaptInterface/Persistence/Exceptions/ValorInvalidoPagamento";

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
export class ServicoCadastramento {
    #assinaturasRepository;
    #clientesRepository;
    #aplicativosRepository;
    #usuariosRepository;

    constructor(assinaturasRepository, clienteRepository, aplicativosRepository, usuariosRepository) {
        this.#assinaturasRepository = assinaturasRepository;
        this.#clientesRepository = clienteRepository;
        this.#aplicativosRepository = aplicativosRepository;
        this.#usuariosRepository = usuariosRepository;
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
     * Procura e substitui uma instância de Assinatura registrada no sistema.
     * 
     * @param {Assinatura} assinatura Objeto assinatura novo.
     * @return Objeto modelo da Assinatura já atualizado.
     */
    async atualizarAssinatura(assinatura) {
        return this.#assinaturasRepository.atualizarAssinatura(assinatura);
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
     * Retorna um objeto modelo montado da entidade Assinatura de acordo com o ID passado.
     * @param {Number} codigo Código identificador da instância de Assinatura.
     * @return Objeto modelo da entidade Assinatura.
     */
    async assinaturaPorId(codigo) {
        return this.#aplicativosRepository.consultarPorId(codigo);
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

    /**
     * Registra um cliente no sistema.
     * 
     * @param {Cliente} cliente Objeto modelo para criação de entidade Cliente.
     * @return Objeto modelo da entidade criada.
     */
    async criarCliente(cliente) {
        return this.#clientesRepository.registrar(cliente);
    }

    /**
     * Registra um usuário no sistema.
     * 
     * @param {Usuario} usuario Objeto modelo para criação de entidade Usuario.
     * @return Objeto modelo da entidade criada.
     */
    async criarUsuario(usuario) {
        return this.#usuariosRepository.registrar(usuario);
    }

    /**
     * Registra um aplicativo no sistema.
     * 
     * @param {Aplicativo} aplicativo Objeto modelo para criação da entidade Aplicativo.
     * @return Objeto modelo da entidade criada.
     */
    async criarAplicativo(aplicativo) {
        return this.#aplicativosRepository.registrar(aplicativo);
    }

    async consumirPagamento(assinatura, valorPago, dataPagamento) {
        // Obtendo objeto de assinatura relativo ao pagamento
        let assinaturaAlvo;
        try {
            assinaturaAlvo = await this.assinaturaPorId(assinatura);
        } catch (error) {
            if (error instanceof AssinaturaInexistenteError) {
                throw new NotFoundException("Pagamento feito para Assinatura inexistente", {
                    cause: error
                });
            }
            throw new Error(`Erro ao consumir evento de pagamento. ${error}`);
        }

        if (assinaturaAlvo.aplicativo.custoMensal <= valorPago) {
            // Criando novo prazo de vigência
            let fimVigenciaDate = new Date(assinaturaAlvo.fimVigencia.replace(' ', 'T'));
            let dataPagamentoDate = new Date(dataPagamento.replace(' ', 'T'));
            let newFimVigenciaDate = new Date();

            if (fimVigenciaDate >= dataPagamentoDate)
                newFimVigenciaDate.setDate(fimVigenciaDate.getDate() + 30);
            else
                newFimVigenciaDate.setDate(dataPagamentoDate.getDate() + 30);
            
            // Registrando novo prazo
            this.atualizarAssinatura({
                codigo: assinaturaAlvo.codigo,
                aplicativo: assinaturaAlvo.aplicativo,
                cliente: assinaturaAlvo.cliente,
                inicioVigencia: assinaturaAlvo.inicioVigencia,
                fimVigencia: newFimVigenciaDate.toJSON().slice(0, 19).replace('T', ' ')
            });
        } else {
            throw new ValorInvalidoPagamento("Valor pago é menor que o valor da mensalidade");
        }
    }
}