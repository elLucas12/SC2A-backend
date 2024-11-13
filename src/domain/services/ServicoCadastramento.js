import { AssinaturaEntity } from "../entities/AssinaturaEntity";
import { IRepository } from "../repositories/IRepository";
import { validate } from "bycontract";

export class ServicoCadastramento {
    atualizaPrecoAssinatura(preco) {
        
    }

    atualizaValidadeAssinatura(assinatura) {
        validate(assinatura, AssinaturaEntity);
    }
}
