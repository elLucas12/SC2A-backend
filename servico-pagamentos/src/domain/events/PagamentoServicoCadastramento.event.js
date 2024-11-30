import { EventoModel } from "./EventoModel.event";

export class EventoPagamentoServicoCadastramento extends EventoModel {
    #pattern;
    #payload;

    constructor(payload) {
        this.#payload = payload;
        this.#pattern = 'servicoCadastramento';
    }

    get pattern() {
        return this.#pattern;
    }

    set pattern(pattern) {
        this.#pattern = pattern;
    }

    get payload() {
        return this.#payload;
    }

    set payload(payload) {
        this.#payload = payload;
    }
}