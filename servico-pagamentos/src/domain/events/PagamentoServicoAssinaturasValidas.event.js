import { EventoModel } from "./EventoModel.event";

export class EventoPagamentoServicoAssinaturasValidas extends EventoModel {
    #payload;
    #pattern;

    constructor(payload) {
        super();
        this.#payload = payload;
        this.#pattern = 'ServicoAssinaturasValidas';
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