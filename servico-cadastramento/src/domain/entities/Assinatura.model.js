/**
 * Modelo da entidade Assinatura.
 * 
 * Representa uma instância de assinatura presente no sistema.
 */
export class AssinaturaModel {
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