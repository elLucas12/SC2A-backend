/**
 * Entidade Usuario.
 *
 * Representa uma instância de usuário presente no sistema.
 */
export class Usuario {
    usuario;
    senha;

    constructor(usuario, senha) {
        this.usuario = usuario;
        this.senha = senha;
    }
}
