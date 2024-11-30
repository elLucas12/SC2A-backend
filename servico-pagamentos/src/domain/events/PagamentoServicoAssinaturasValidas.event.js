import { EventoModel } from "./EventoModel.event";

export class EventoPagamentoServicoAssinaturasValidas extends EventoModel {
    #payload;
    #pattern;

    constructor(payload) {
        this.#payload = payload;
        this.#pattern = 'servicoAssinaturasValidas';
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