export class ValorInvalidoPagamento extends Error {
    constructor(msg, opts) {
        super(msg, opts);
        this.name = this.constructor.name;
    }
}
