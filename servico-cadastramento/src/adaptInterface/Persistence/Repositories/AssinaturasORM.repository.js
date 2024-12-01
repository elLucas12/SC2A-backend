import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MoreThan, LessThanOrEqual } from 'typeorm';

import { Assinatura } from '../Entities/Assinatura.entity';
import { IAssinaturasModelRepository } from '../../../domain/repositories/IAssinaturasModel.repository';
import { AplicativoModel } from '../../../domain/entities/Aplicativo.model';
import { ClienteModel } from '../../../domain/entities/Cliente.model';
import { AssinaturaModel } from '../../../domain/entities/Assinatura.model';

/**
 * Representa o tipo de assinatura dentro do contexto de válidade das regras de negócio.
 */
export const TipoConsultaAssinatura = {
    TODAS: Symbol('todas'),
    ATIVAS: Symbol('ativas'),
    CANCELADAS: Symbol('canceladas')
};

/**
 * Repositório de gerenciamento de dados das assinaturas armazenadas no banco do sistema por
 * meio de ORM.
 *
 * Instâncias deste tipo apresenta relacionamento 1 para n com as entidades Aplicativo
 * e Cliente.
 */
@Injectable()
@Dependencies(getRepositoryToken(Assinatura))
export class AssinaturasRepositoryORM extends IAssinaturasModelRepository {
    /**
     * Array de objetos "AssinaturaEntityORM", representando as assinaturas armazenadas no sistema.
    */
    #assinaturasRepo;

    constructor(assinaturas) {
        super();
        this.#assinaturasRepo = assinaturas;
    }

    /**
     * Registra uma instância de assinatura no banco.
     * 
     * @param {Assinatura} assinatura Objeto da entidade Assinatura a ser armazenada.
     * @return Objeto Assinatura construido (AssinaturaEntity).
     */
    async registrar(assinatura) {
        const resp = await this.#assinaturasRepo.save(assinatura);
        return AssinaturasRepositoryORM.createFromObject(resp);
    }

    /**
     * Deleta uma instância de Assinatura no banco.
     * 
     * @param {Number} codigo Referência da assinatura a ser deletada.
     * @return Objeto Assinatura construido (AssinaturaEntity).
     */
    async deletar(codigo) {
        const resp = await this.#assinaturasRepo.delete(codigo);
        return AssinaturasRepositoryORM.createFromObject(resp);
    }

    /**
     * Recupera e constrói todos os "AssinaturaEntity" armazenados no sistema.
     * 
     * @return Lista com todas as assinaturas registrados, em forma de objeto já construido.
     */
    async todos() {
        const resp = await this.#assinaturasRepo.find();
        return resp.map(AssinaturasRepositoryORM.createFromObject);
    }

    /**
     * Atualiza uma assinatura de um aplicativo registrado no banco.
     * 
     * @param {Assinatura} assinatura Instância da assinatura atualizada.
     * @return Obj. de modelo da entidade Assinatura.
     */
    async atualizarAssinatura(assinatura) {
        let codigoAssinatura = assinatura.codigo;
        let assinaturaAlvo = await this.#assinaturasRepo.findOneBy({codigoAssinatura});
        if (assinaturaAlvo !== undefined) {
            const resp = await this.#assinaturasRepo.save(assinatura); // substitui a assinatura do repo.
            return AplicativosRepositoryORM.createFromObject(resp);
        } 
    }

    /**
     * Consulta uma Assinatura através do código da mesma no banco.
     * 
     * @param {Number} codigo Referência chave da assinatura
     * @returns Obj. AssinaturaEntity pesquisado.
     */
    async consultarPorCodigo(codigo) {
        const resp = await this.#assinaturasRepo.findOneBy({codigo});
        return AssinaturasRepositoryORM.createFromObject(resp);
    }

    /**
     * Consulta todas as assinaturas presentes no sistemas conforme o tipo passado.
     * 
     * @param {TipoConsultaAssinatura} tipo Tipo de assinatura a ser consultada.
     * @return Obj. com todas as assinaturas conforme o tipo ou 'undefined' caso tipo != TipoConsulta.
     */
    async consultarPorTipo(tipo) {
        let resp;
        let dataAtual = new Date().toJSON().slice(0, 19).replace('T', ' ');
        switch (tipo) {
            case TipoConsultaAssinatura.TODAS:
                return await this.todos();
            case TipoConsultaAssinatura.ATIVAS:
                resp = await this.#assinaturasRepo.find({
                    where: {
                        fimVigencia: MoreThan(dataAtual)
                    }
                });
                break;
            case TipoConsultaAssinatura.CANCELADAS:
                resp = await this.#assinaturasRepo.find({
                    where: {
                        fimVigencia: LessThanOrEqual(dataAtual)
                    }
                });
                break;
            default:
                return undefined;
        }
        return resp.map(AssinaturasRepositoryORM.createFromObject);
    }

    /**
     * Consulta e retorna todas as assinaturas referentes ao cliente passado.
     * 
     * @param {Number} codigo Código de referência do cliente.
     * @return Objeto com todas as assinaturas do cliente.
     */
    async consultarPorCliente(codigo) {
        const resp = await this.#assinaturasRepo.find({
            where: {
                cliente: {
                    codigo: codigo
                }
            }
        });
        return resp.map(AssinaturasRepositoryORM.createFromObject);
    }

    /**
     * Consulta e retorna todas as assinaturas referentes ao aplicativo passado.
     * 
     * @param {Number} codigo Código de referência do aplicativo.
     * @return Objeto com todas as assinaturas do aplicativo.
     */
    async consultarPorAplicativo(codigo) {
        const resp = await this.#assinaturasRepo.find({
            where: {
                aplicativo: {
                    codigo: codigo
                }
            }
        });
        return resp.map(AssinaturasRepositoryORM.createFromObject);
    }

    /**
     * Consulta a assinatura referente ao código passado.
     * 
     * @param {Number} codigo Código de referência da assinatura.
     * @return Objeto modelo da respectiva assinatura.
     */
    async consultarPorId(codigo) {
        const resp = await this.#assinaturasRepo.find({
            where: {
                codigo: codigo
            }
        });
        return AssinaturasRepositoryORM.createFromObject(resp);
    }

    /**
     * Recebe os parâmetros de origem da entidade Assinatura e retorna o objeto construido.
     * 
     * @param {*} param0 Parâmetros de construção da entidade Assinatura.
     * @return Retorna o objeto de modelo da entidade Assinatura relacionada.
     */
    static createFromObject({ codigo, aplicativo, cliente, inicioVigencia, fimVigencia }) {
        let aplicativoModel = new AplicativoModel(aplicativo.codigo, aplicativo.nome, aplicativo.custoMensal);
        let clienteModel = new ClienteModel(cliente.codigo, cliente.nome, cliente.email);
        let assinaturaEntityModel = new AssinaturaModel(codigo, aplicativoModel, clienteModel, inicioVigencia, fimVigencia);
        return assinaturaEntityModel;
    }
}