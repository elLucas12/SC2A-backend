import { validate } from "bycontract";
import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento";

@Injectable()
@Dependencies(ServicoCadastramento)
export class RegistraAplicativo_UC {
    #servicoCadastramento;

    constructor(servicoCadastramento) {
        validate(servicoCadastramento, ServicoCadastramento);
        this.#servicoCadastramento = servicoCadastramento;
    }

    async run(dados) {
        let aplicativo = this.#servicoCadastramento.criarAplicativo({
            nome: dados.nome,
            custoMensal: dados.custoMensal
        });
        return {
            nome: aplicativo.nome,
            custoMensal: aplicativo.custoMensal
        };
    }
}