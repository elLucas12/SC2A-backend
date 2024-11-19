/**
 * Modelo da entidade Cliente.
 *
 * Representa uma instância de cliente presente sistema.
 */
export class ClienteModel {
  codigo;
  nome;
  email;

  constructor(codigo, nome, email) {
      this.codigo = codigo;
      this.nome = nome;
      this.email = email;
  }
}
