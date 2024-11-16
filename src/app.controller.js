import { Controller, Dependencies, Get } from '@nestjs/common';
import { ClientesCadastrados_UC } from './aplication/ClientesCadastrados';
import { AplicativosCadastrados_UC } from './aplication/AplicativosCadastrados';
import { RegistraAssinatura_UC } from './aplication/RegistraAssinatura';
import { AtualizaCusto_UC } from './aplication/AtualizaCusto';
import { AssinaturasVigentes_UC } from './aplication/AssinaturasVigentes';
import { AssinaturasClientes_UC } from './aplication/AssinaturasClientes';
import { AssinaturasAplicativo_UC } from './aplication/AssinaturasAplicativo';

@Controller()
@Dependencies(
    ClientesCadastrados_UC, 
    AplicativosCadastrados_UC,
    RegistraAssinatura_UC,
    AtualizaCusto_UC,
    AssinaturasVigentes_UC,
    AssinaturasClientes_UC,
    AssinaturasAplicativo_UC
)
export class AppController {
    constructor(
        clientesCadastradosUC, 
        aplicativosCadastradosUC, 
        registraAssinaturaUC, 
        atualizaCustoUC,
        assinaturasVigentesUC,
        assinaturasClientesUC,
        assinaturasAplicativoUC
    ) {
        this.clientesCadastradosUC = clientesCadastradosUC;
        this.aplicativosCadastradosUC = aplicativosCadastradosUC;
        this.registraAssinaturaUC = registraAssinaturaUC;
        this.atualizaCustoUC = atualizaCustoUC;
        this.assinaturasVigentesUC = assinaturasVigentesUC;
        this.assinaturasClientesUC = assinaturasClientesUC;
        this.assinaturasAplicativoUC = assinaturasAplicativoUC;
    }

    /**
     * Retorna uma lista com todos os clientes cadastrados.
     *
     * @return JSON no esquema [{codigo, nome, email}, ...]
     */
    @Get('servcad/clientes')
    getClientesCadastrados() {
        return this.clientesCadastradosUC.run();
    }

    /**
     * Retorna uma lista com todos os aplicativos cadastrados.
     *
     * @return JSON no esquema [{codigo, nome, custo}, ...]
     */
    @Get('servcad/aplicativos')
    getAplicativosCadastrados() {
        return this.aplicativosCadastradosUC.run();
    }

    /**
     * Cria uma nova assinatura no sistema.
     *
     * O corpo da requisição HTTP deve seguir o seguinte esquema padrão: 
     * {código do cliente, código do aplicativo}.
     *
     * @param {Array} dados Corpo de requisição com o código de cliente e aplicativo.
     * @return Cadastro completo da assinatura em JSON no esquema [{código assinatura,
     *      código cliente, código aplicativo, data de início, data de encerramento}].
     */
    @Post('servcad/assinaturas')
    @Bind(Body())
    postCriaAssinatura(dados) {
        return this.registraAssinaturaUC.run(dados);
    }

    /**
     * Atualiza o custo mensal de um aplicativo cadastrado.
     *
     * Deve-se enviar como parâmetro o ID do aplicativo cadastrado e o novo custo mensal 
     * para atualização.
     *
     * @param {Array} param Parâmetro GET com o ID do aplicativo.
     * @param {Array} dados Corpo de requisição com o valor atualizado do custo mensal.
     * @return Cadastro completo do aplicativo com valor de custo mensal atualizado.
     */
    @Patch('servcad/aplicativos/:idAplicativo')
    @Bind(Param())
    @Bind(Body())
    patchAtualizaCustoAplicativo(param, dados) {
        return this.atualizaCustoUC.run(param.idAplicativo, dados.custo);
    }

    /**
     * Retorna as assinaturas vigentes conforme parâmetro de entrada.
     * 
     * Os tipos de entrada válidos são "{ TODAS, ATIVAS, CANCELADAS }".
     * 
     * O padrão de retorno das saídas é [{código assinatura, código cliente, código aplicativo,
     * data de início, data de fim, status}, ...].
     * 
     * Em data de encerramento posterior a data atual => Status=[ATIVA | CANCELADA].
     * 
     * @param {Array} param Lista de parâmetros passados, especificando o tipo de assinatura.
     * @return JSON com dados completos das assinaturas vigentes.
     */
    @Get('servcad/assinaturas/:tipo')
    @Bind(Param())
    getAssinaturasVigentes(param) {
        return this.assinaturasVigentesUC.run(param.tipo);
    }

    /**
     * Retorna as assinaturas conforme o código de cliente passado como parâmetro.
     * 
     * A resposta em JSON apresenta-se com o padrão: [{código assinatura, código cliente, 
     * código aplicativo, data de início, data de fim, status}, ...].
     * 
     * @param {Array} param Lista de parâmetros passados, especificando o código de cliente.
     * @return JSON com dados completos das assinaturas relacionadas ao cliente.
     */
    @Get('servcad/asscli/:codcli')
    @Bind(Param())
    getAssinaturasCliente(param) {
        return this.assinaturasClientesUC.run(param.codcli);
    }

    /**
     * Recebe o código de aplicativo e retorna as assinaturas relacionadas.
     * 
     * A resposta em JSON apresenta-se com o padrão: [{código, assinatura, código cliente,
     * código aplicativo, data de início, data de fim, status}, ...].
     * 
     * @param {Array} param Lista de parâmetros de entrada, especificando o código do aplicativo.
     * @return JSON com dados completos das assinaturas relacionadas ao aplicativo.
     */
    @Get('servcad/assapp/:codapp')
    @Bind(Param())
    getAssinaturasAplicativo(param) {
        return this.assinaturasAplicativoUC.run(param.codApp);
    }
}
