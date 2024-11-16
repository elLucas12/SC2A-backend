import { validate } from "bycontract";
import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento";

@Injectable()
@Dependencies(ServicoCadastramento)
export class RegistraAssinatura_UC {
    #servicoCadastramento;

    constructor(servicoCadastramento) {
        validate(servicoCadastramento, ServicoCadastramento);
        this.#servicoCadastramento = servicoCadastramento;
    }

    async run(dados) {
        // Objeto de tempo atual e o do fim de vigência (7 dias grátis + 30 da mensalidade).
        let dateAux = new Date();
        let dateAuxPlus = new Date(dateAux);
        dateAuxPlus.setDate(dateAuxPlus.getDate() + 37);

        // Registrando assinatura no sistema
        let assinatura = await this.#servicoCadastramento.criarAssinatura({
            codCli: dados.codCli,
            codApp: dados.codApp,
            inicioVigencia: dateAux.toISOString(),
            fimVigencia: dateAuxPlus.toISOString()
        });

        // Retornando no formato correto
        return {
            codigo: assinatura.codigo,
            codApp: assinatura.codApp.codigo,
            codCli: assinatura.codCli.codigo,
            inicioVigencia: assinatura.inicioVigencia,
            fimVigencia: assinatura.fimVigencia
        };
    }
}