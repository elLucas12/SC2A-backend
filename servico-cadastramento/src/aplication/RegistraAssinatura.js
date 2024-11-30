import { validate } from "bycontract";
import { Injectable, Dependencies, BadRequestError } from "@nestjs/common";
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

        // Verificando se datas foram passadas por parâmetro
        if (dados.fimVigencia) {
            dateAuxPlus = new Date(dados.fimVigencia);
        }
        if (dados.inicioVigencia) {
            dateAux = new Date(dados.inicioVigencia);
        }

        // Registrando assinatura no sistema
        let assinatura = await this.#servicoCadastramento.criarAssinatura({
            cliente: dados.cliente,
            aplicativo: dados.aplicativo,
            inicioVigencia: dateAux.toJSON().slice(0, 19).replace('T', ' '),
            fimVigencia: dateAuxPlus.toJSON().slice(0, 19).replace('T', ' ')
        });

        // Retornando no formato correto
        if (assinatura === undefined) {
            throw new BadRequestError('Tipo de consulta de assinatura inválida!');
        } else {
            return {
                codigo: assinatura.codigo,
                aplicativo: assinatura.aplicativo.codigo,
                cliente: assinatura.cliente.codigo,
                inicioVigencia: assinatura.inicioVigencia,
                fimVigencia: assinatura.fimVigencia
            };
        }
    }
}