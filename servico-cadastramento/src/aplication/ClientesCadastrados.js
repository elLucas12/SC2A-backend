import { validate } from "bycontract";
import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento";

@Injectable()
@Dependencies(ServicoCadastramento)
export class ClientesCadastrados_UC {
    #servicoCadastramento;

    constructor(servicoCadastramento) {
        validate(servicoCadastramento, ServicoCadastramento);
        this.#servicoCadastramento = servicoCadastramento;
    }

    async run() {
        const clientesCadastrados = await this.#servicoCadastramento.clientesCadastrados();
        return clientesCadastrados.map((item) => {
            return {
                codigo: item.codigo,
                nome: item.nome,
                email: item.email
            }
        });
    }
}