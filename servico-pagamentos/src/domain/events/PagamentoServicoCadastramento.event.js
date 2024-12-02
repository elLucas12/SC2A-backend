import { EventoModel } from "./EventoModel.event";

export class EventoPagamentoServicoCadastramento extends EventoModel {
    #pattern;
    #payload;

    constructor(payload) {
        super();
        this.#payload = payload;
        this.#pattern = 'ServicoCadastramento';
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