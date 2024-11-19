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
                aplicativo: {
                    codigo: item.aplicativo.codigo,
                    nome: item.aplicativo.nome,
                    custoMensal: item.aplicativo.custoMensal
                },
                cliente: {
                    codigo: item.cliente.codigo,
                    nome: item.cliente.nome,
                    email: item.cliente.email
                },
                inicioVigencia: item.inicioVigencia,
                fimVigencia: item.fimVigencia
            }
        });
    }
}