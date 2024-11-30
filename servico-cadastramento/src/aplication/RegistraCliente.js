import { validate } from "bycontract";
import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento";

@Injectable()
@Dependencies(ServicoCadastramento)
export class RegistraCliente_UC {
    #servicoCadastramento;

    constructor(servicoCadastramento) {
        validate(servicoCadastramento, ServicoCadastramento);
        this.#servicoCadastramento = servicoCadastramento;
    }

    async run(dados) {
        let cliente = this.#servicoCadastramento.criarCliente({
            nome: dados.nome,
            email: dados.email
        });
        return {
            nome: cliente.nome,
            email: cliente.email
        };
    }
}