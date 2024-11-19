import { validate } from "bycontract";
import { Injectable, Dependencies, BadRequestException } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento";
import { TipoConsultaAssinatura } from "../adaptInterface/Persistence/Repositories/AssinaturasORM.repository";

@Injectable()
@Dependencies(ServicoCadastramento)
export class AssinaturasVigentes_UC {
    #servicoCadastramento;

    constructor(servicoCadastramento) {
        validate(servicoCadastramento, ServicoCadastramento);
        this.#servicoCadastramento = servicoCadastramento;
    }

    async run(tipo) {
        validate(tipo, 'string');
        switch (tipo.toLowerCase()) {
            case 'todas':
                tipo = TipoConsultaAssinatura.TODAS;
                break;
            case 'ativas':
                tipo = TipoConsultaAssinatura.ATIVAS;
                break;
            case 'canceladas':
                tipo = TipoConsultaAssinatura.CANCELADAS;
                break;
            default:
                throw new BadRequestException('Tipo de consulta de assinatura inválido!');
        }
        const assinaturasVigentes = await this.#servicoCadastramento.assinaturasTipo(tipo);
        return assinaturasVigentes.map((item) => {
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