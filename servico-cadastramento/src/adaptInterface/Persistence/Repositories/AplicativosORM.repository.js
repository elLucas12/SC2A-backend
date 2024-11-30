import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Aplicativo } from '../Entities/Aplicativo.entity';
import { IAplicativosModelRepository } from '../../../domain/repositories/IAplicativosModel.repository';
import { AplicativoModel } from '../../../domain/entities/Aplicativo.model';

@Injectable()
@Dependencies(getRepositoryToken(Aplicativo))
export class AplicativosRepositoryORM extends IAplicativosModelRepository {
    /**
     * Array de objetos AplicativoEntity, representando os aplicativos armazenadas no sistema.
     */
    #aplicativosRepo;

    constructor(aplicativos) {
        super();
        this.#aplicativosRepo = aplicativos;
    }

    /**
     * Registra uma instância de aplicativo no banco.
     * 
     * @param {Aplicativo} aplicativo Objeto da entidade Aplicativo a ser armazenada.
     * @return Obj. de modelo da entidade Aplicativo.
     */
    async registrar(aplicativo) {
        const resp = await this.#aplicativosRepo.save(aplicativo);
        return AplicativosRepositoryORM.createFromObject(resp);
    }

    /**
     * Deleta uma instância de aplicativo no banco.
     * 
     * @param {Number} codigo Referência do aplicativo a ser deletado.
     * @return Obj. de modelo da entidade Aplicativo.
     */
    async deletar(codigo) {
        const resp = await this.#aplicativosRepo.delete(codigo);
        return AplicativosRepositoryORM.createFromObject(resp);
    }

    /**
     * Recupera e constrói todos os AplicativosEntity armazenados no sistema.
     * 
     * @return Lista com todos os aplicativos registrados, em forma de objeto já construido.
     */
    async todos() {
        const resp = await this.#aplicativosRepo.find();
        return resp.map(AplicativosRepositoryORM.createFromObject);
    }

    /**
     * Consulta instâncias de Aplicativo dentro do banco através do código de referência.
     * 
     * @param {Number} codigo Código de referência do aplicativo a ser consultado.
     * @return Lista/Unidade de obj. consultado.
     */
    async consultarPorCodigo(codigo) {
        const resp = await this.#aplicativosRepo.findOneBy({codigo});
        return AplicativosRepositoryORM.createFromObject(resp);
    }

    /**
     * Atualiza o custo mensal de um aplicativo registrado no banco através do código.
     * 
     * @param {Number} codigo Referência do aplicativo a ser alterado.
     * @param {Number} custo Novo custo para o aplicativo.
     * @return Obj. de entidade Aplicativo alterada.
     */
    async atualizarCusto(codigo, custo) {
        let aplicativoAlvo = await this.#aplicativosRepo.findOneBy({codigo});
        if (aplicativoAlvo !== undefined) {
            const resp = await this.#aplicativosRepo.save({
                codigo: aplicativoAlvo.codigo,
                nome: aplicativoAlvo.nome,
                custoMensal: custo
            });
            return AplicativosRepositoryORM.createFromObject(resp);
        } 
    }

    /**
     * Recebe os parâmetros de origem da entidade Aplicativo e retorna o objeto construido.
     * 
     * @param {*} param0 Parâmetros de construção da entidade Aplicativo.
     * @return Retorna o objeto de modelo da entidade Aplicativo construido.
     */
    static createFromObject({ codigo, nome, custoMensal }) {
        let aplicativoEntityModel = new AplicativoModel(codigo, nome, custoMensal);
        return aplicativoEntityModel;
    }
}
