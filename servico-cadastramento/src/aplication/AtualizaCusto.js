import { validate } from "bycontract";
import { Injectable, Dependencies, BadRequestException } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento";

@Injectable()
@Dependencies(ServicoCadastramento)
export class AtualizaCusto_UC {
    #servicoCadastramento;

    constructor(servicoCadastramento) {
        validate(servicoCadastramento, ServicoCadastramento);
        this.#servicoCadastramento = servicoCadastramento;
    }

    async run(codigo, custo) {
        const aplicativo = await this.#servicoCadastramento.atualizarCusto(codigo, custo);
        if (aplicativo === undefined) {
            throw new BadRequestException('Cadastro de aplicativo não encontrado!');
        } else {
            return {
                codigo: aplicativo.codigo,
                nome: aplicativo.nome,
                custoMensal: aplicativo.custoMensal
            };
        }
    }
}