import { validate } from "bycontract";
import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento";
import { TipoConsultaAssinatura } from "../infrastructure/AssinaturasRepositoryORM";

@Injectable()
@Dependencies(ServicoCadastramento)
export class AssinaturasVigentes_UC {
    #servicoCadastramento;

    constructor(servicoCadastramento) {
        validate(servicoCadastramento, ServicoCadastramento);
        this.#servicoCadastramento = servicoCadastramento;
    }

    async run(tipo) {
        validate(tipo, TipoConsultaAssinatura);
        const assinaturasVigentes = await this.#servicoCadastramento.assinaturasTipo(tipo);
        return assinaturasVigentes.map((item) => {
            return {
                codigo: item.codigo,
                codApp: item.codApp.codigo,
                codCli: item.codCli.codigo,
                inicioVigencia: item.inicioVigencia,
                fimVigencia: item.fimVigencia
            }
        });
    }
}