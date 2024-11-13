/**
 * Entidade Cliente.
 *
 * Representa uma instância de cliente presente sistema.
 */
export class ClienteEntity {
    codigo;
    nome;
    email;

    constructor(codigo, nome, email) {
        this.codigo = codigo;
        this.nome = nome;
        this.email = email;
    }
}
