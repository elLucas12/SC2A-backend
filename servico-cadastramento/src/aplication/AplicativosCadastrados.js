import { validate } from "bycontract";
import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento";

@Injectable()
@Dependencies(ServicoCadastramento)
export class AplicativosCadastrados_UC {
    #servicoCadastramento;

    constructor(servicoCadastramento) {
        validate(servicoCadastramento, ServicoCadastramento);
        this.#servicoCadastramento = servicoCadastramento;
    }

    async run() {
        const aplicativosCadastrados = await this.#servicoCadastramento.aplicativosCadastrados();
        return aplicativosCadastrados.map((item) => {
            return {
                codigo: item.codigo,
                nome: item.nome,
                custoMensal: item.custoMensal
            }
        });
    }
}