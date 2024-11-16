import { validate } from "bycontract";
import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento";

@Injectable()
@Dependencies(ServicoCadastramento)
export class AssinaturasAplicativo_UC {
    #servicoCadastramento;

    constructor(servicoCadastramento) {
        validate(servicoCadastramento, ServicoCadastramento);
        this.#servicoCadastramento = servicoCadastramento;
    }

    async run(codigo) {
        const assinaturasAplicativo = await this.#servicoCadastramento.assinaturasAplicativo(codigo);
        return assinaturasAplicativo.map((item) => {
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