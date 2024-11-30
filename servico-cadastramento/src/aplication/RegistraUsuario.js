import { validate } from "bycontract";
import { Injectable, Dependencies } from "@nestjs/common";
import { ServicoCadastramento } from "../domain/services/ServicoCadastramento";

@Injectable()
@Dependencies(ServicoCadastramento)
export class RegistraUsuario_UC {
    #servicoCadastramento;

    constructor(servicoCadastramento) {
        validate(servicoCadastramento, ServicoCadastramento);
        this.#servicoCadastramento = servicoCadastramento;
    }

    async run(dados) {
        let usuario = this.#servicoCadastramento.criarUsuario({
            usuario: dados.usuario,
            senha: dados.senha
        });
        return {
            usuario: usuario.usuario,
            senha: usuario.senha
        };
    }
}