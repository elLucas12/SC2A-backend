/**
 * Assume-se que esta interface prevê que todos os métodos recebem 
 * e retornam instâncias de AssinaturaModel
 */
export class IAssinaturasModelRepository {
    registrar() {}
    deletar() {}
    todos() {}
    consultarPorCodigo(codigo) {}
    consultarPorTipo(tipo) {}
    consultarPorCliente(codigo) {}
    consultarPorAplicativo(codigo) {}
}