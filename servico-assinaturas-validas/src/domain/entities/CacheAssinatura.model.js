export class CacheAssinaturaModel {
    codigo;
    assinatura;
    isValid;

    constructor(codigo, assinatura, isValid) {
        this.codigo = codigo;
        this.assinatura = assinatura;
        this.isValid = isValid;
    }
}