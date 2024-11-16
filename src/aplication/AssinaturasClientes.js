import { validate } from "bycontract";
import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento";

@Injectable()
@Dependencies(ServicoCadastramento)
export class AssinaturasClientes_UC {
    #servicoCadastramento;

    constructor(servicoCadastramento) {
        validate(servicoCadastramento, ServicoCadastramento);
        this.#servicoCadastramento = servicoCadastramento;
    }

    async run(codigo) {
        const assinaturasCliente = await this.#servicoCadastramento.assinaturasCliente(codigo);
        return assinaturasCliente.map((item) => {
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