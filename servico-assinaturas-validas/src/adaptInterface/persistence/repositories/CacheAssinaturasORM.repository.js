import { ICacheAssinaturasModelRepository } from "../../../domain/repositories/ICacheAssinaturasModel.repository";
import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CacheAssinatura } from "../entities/CacheAssinatura.entity";
import { CacheAssinaturaModel } from "../../../domain/entities/CacheAssinatura.model";

@Injectable()
@Dependencies(getRepositoryToken(CacheAssinatura))
export class CacheAssinaturasRepositoryORM extends ICacheAssinaturasModelRepository {
    #cacheAssinaturasRepo;

    constructor(cacheAssinaturas) {
        super();
        this.#cacheAssinaturasRepo = cacheAssinaturas;
    }

    /**
     * Registra uma instância de cache no banco.
     * 
     * @param {CacheAssinatura} cache Objeto de cache a ser armazenado.
     * @return Objeto de cache construido (CacheAssinaturaModel).
     */
    async registrar(cache) {
        const resp = await this.#cacheAssinaturasRepo.save(cache);
        return CacheAssinaturasRepositoryORM.createFromObject(resp);
    }

    /**
     * Deleta uma instância cache no banco.
     * 
     * @param {Number} codigo Código do cache a ser deletado.
     * @return Objeto de cache construido (CacheAssinaturaModel).
     */
    async deletar(codigo) {
        const resp = await this.#cacheAssinaturasRepo.delete(codigo);
        return CacheAssinaturasRepositoryORM.createFromObject(resp);
    }

    /**
     * Recupera e constrói todas as instâncias Cache armazenadas no sistema.
     * 
     * @return Lista com todo o cache registrado, em forma de objeto já construido.
     */
    async todos() {
        const resp = await this.#cacheAssinaturasRepo.find();
        return resp.map(CacheAssinaturasRepositoryORM.createFromObject);
    }

    /**
     * Consulta uma assinatura em cache através do código (ID) da mesma.
     * @param {Number} assinatura Código da assinatura em cache.
     * @return Objeto modelo de CacheAssinatura referente à consulta ou 'undefined' (perda).
     */
    async consultarPorAssinatura(assinatura) {
        const resp = this.#cacheAssinaturasRepo.find({
            where: {
                assinatura: assinatura
            }
        });
        if (resp)
            return CacheAssinaturasRepositoryORM.createFromObject(resp);
        else
            return undefined;
    }

    /**
     * Recebe os parâmetros de origem da entidade de cache e retorna o objeto construido.
     * 
     * @param {*} param0 Parâmetros de construção da entidade CacheAssinatura.
     * @return Retorna o objeto CacheAssinaturaModel construido.
     */
    static createFromObject({ codigo, aplicativo, cliente, inicioVigencia, fimVigencia }) {
        return( new CacheAssinaturaModel(
            codigo,
            aplicativo,
            cliente,
            inicioVigencia,
            fimVigencia
        ));
    }
}