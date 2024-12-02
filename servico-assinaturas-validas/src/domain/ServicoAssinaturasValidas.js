import { Injectable, Dependencies, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, catchError } from 'rxjs';
import { CacheAssinaturasRepositoryORM } from '../adaptInterface/persistence/repositories/CacheAssinaturasORM.repository';

@Injectable()
@Dependencies(
    CacheAssinaturasRepositoryORM,
    ConfigService,
    HttpService
)
export class ServicoAssinaturasValidas {
    BASEURL_CADASTRAMENTO;
    #cacheAssinaturasRepository;
    #configService;
    #httpService;
    #logger;

    constructor(cacheAssinaturasRepository, configService, httpService) {
        this.#cacheAssinaturasRepository = cacheAssinaturasRepository;
        this.#configService = configService;
        this.#httpService = httpService;
        this.#logger = new Logger(ServicoAssinaturasValidas.name);
        this.setEnvironment();
    }

    /**
     * Define as variáveis de ambiente e assuntos afins.
     */
    setEnvironment() {
        this.BASEURL_CADASTRAMENTO = this.#configService.getOrThrow('BASEURL_CADASTRAMENTO');
    }

    /**
     * Chama o serviço de assinaturas válidas e retorna se a assinatura passada
     * ainda está ativa conforme o sistema.
     * 
     * @param {Number} assinatura Código da assinatura em cache.
     * @return Booleano informando se a assinatura está ou não ativa.
     */
    async aindaAtiva(assinatura) { //Date().toJSON().slice(0, 19).replace('T', ' ')
        // Consulta no banco o respectivo cache de dados (CacheAssinatura).
        let cacheAssinaturaAlvo = await this.#cacheAssinaturasRepository.consultarPorAssinatura(assinatura);
        let isValid;

        // Consulta a respectiva assinatura caso não exista em cache, senão devolve valor em cache.
        if (Array.isArray(cacheAssinaturaAlvo) && !cacheAssinaturaAlvo.length) {
            cacheAssinaturaAlvo = (await this.#getAssinaturaServicoCadastramento(assinatura));
            if (!cacheAssinaturaAlvo) { // caso não exista nem no ServicoCadastramento
                return false;
            }

            // Objeto date para comparação de vigência
            console.log(cacheAssinaturaAlvo);
            let fimVigenciaDateString = cacheAssinaturaAlvo.fimVigencia.replace(' ', 'T');
            let fimVigenciaDate = new Date(fimVigenciaDateString);
            if (fimVigenciaDate <= new Date())
                isValid = false;
            else 
                isValid = true;

            // Adição da nova instância no cache do microsserviço
            this.criarCacheAssinatura({
                assinatura: cacheAssinaturaAlvo.codigo,
                isValid: isValid
            });
        } else {
            isValid = cacheAssinaturaAlvo[0].isValid;
        }
        return isValid;
    }

    /**
     * Recebe os valores de uma entidade de cache, registra ele e o retorna por meio de um modelo
     * da entidade CacheAssinatura.
     * 
     * @param {CacheAssinatura} cacheAssinatura Parâmetros da entidade a ser registrada.
     * @return Objeto modelo da entidade registrada.
     */
    async criarCacheAssinatura(cacheAssinatura) {
        return await this.#cacheAssinaturasRepository.registrar(cacheAssinatura);
    }

    /**
     * Remove uma assinatura do banco do sistema conforme seu identificador.
     * 
     * @param {Number} cacheAssinatura Código da assinatura a ser deletada.
     * @return Objeto modelo da assinatura deletada.
     */
    async deletarCacheAssinatura(cacheAssinatura) {
        return await this.#cacheAssinaturasRepository.deletar(cacheAssinatura);
    }

    /**
     * Requisita uma assinatura no ServicoCadastramento e retorna-a.
     * 
     * @param {Number} assinatura Código de identificação da assinatura.
     * @return Objeto da assinatura ou 'undefined' caso não exista.
     */
    async #getAssinaturaServicoCadastramento(assinatura) {
        console.log(`[REQUEST] => ${this.BASEURL_CADASTRAMENTO}/assinaturas/id/${assinatura}`);
        const req = await firstValueFrom(
            this.#httpService.get(
                `${this.BASEURL_CADASTRAMENTO}/assinaturas/id/${assinatura}`
            ).pipe(
                catchError(error => {
                    this.#logger.error('Falha ao acessar ServicoCadastramento', error);
                    throw new Error(`Falha de acesso ao ServicoCadastramento: ${error.message}`);
                })
            )
        );
        this.#logger.log(req.data);
        return req.data;
    }
}