/**
 * Assume-se que esta interface prevê que todos os métodos recebem 
 * e retornam instâncias de AplicativoModel
 */
export class IAplicativosModelRepository {
    registrar() {}
    deletar() {}
    todos() {}
    consultarPorCodigo(codigo) {}
    atualizarCusto(codigo, custo) {}
}