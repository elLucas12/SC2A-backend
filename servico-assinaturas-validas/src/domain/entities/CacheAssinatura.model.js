export class CacheAssinaturaModel {
    codigo;
    aplicativo;
    cliente;
    inicioVigencia;
    fimVigencia;

    constructor(codigo, aplicativo, cliente, inicioVigencia, fimVigencia) {
        this.codigo = codigo;
        this.aplicativo = aplicativo;
        this.cliente = cliente;
        this.inicioVigencia = inicioVigencia;
        this.fimVigencia = fimVigencia;
    }
}