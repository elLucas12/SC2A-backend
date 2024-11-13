/**
 * Entidade Assinatura.
 * 
 * Representa uma instância de assinatura presente no sistema.
 */
export class AssinaturaEntity {
    codigo;
    codApp;
    codCli;
    inicioVigencia;
    fimVigencia;

    constructor(codigo, codApp, codCli, inicioVigencia, fimVigencia) {
        this.codigo = codigo;
        this.codApp = codApp;
        this.codCli = codCli;
        this.inicioVigencia = inicioVigencia;
        this.fimVigencia = fimVigencia;
    }
}