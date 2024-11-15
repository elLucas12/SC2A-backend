/**
 * Entidade Usuario.
 *
 * Representa uma instância de usuário presente no sistema.
 */
export class UsuarioEntity {
    usuario;
    senha;

    constructor(usuario, senha) {
        this.usuario = usuario;
        this.senha = senha;
    }
}
