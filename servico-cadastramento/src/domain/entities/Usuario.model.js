/**
 * Modelo da entidade Usuario.
 *
 * Representa uma instância de usuário presente no sistema.
 */
export class UsuarioModel {
    usuario;
    senha;

    constructor(usuario, senha) {
        this.usuario = usuario;
        this.senha = senha;
    }
}
