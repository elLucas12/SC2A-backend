# SC2A - Módulo Backend

Código do módulo _backend_ do Sistema de Controle de Assinaturas de Aplicativos, baseado
na lógica de validação de aplicativos de celular.

## Instalando e Rodando a API

Para rodar o _backend_ inteiro é necessário executar os projetos NESTJS de todos os serviços e 
microsserviços de maneira simultânea, especificando as configurações necessárias.

Para *iniciar cada serviço individualmente*, utiliza-se os seguintes comandos:

```bash
# 'ServicoCadastramento' -- porta 3000
$ cd ./ServicoCadastramento/ \
    npm install \
    npm start
# 'ServicoPagamentos' -- porta 3001
$ cd ./ServicoPagamentos/ \
    npm install \
    npm start
# microsserviço 'ServicoAssinaturasValidas' -- porta 3002
$ cd ./ServicoAssinaturasValidas/ \
    npm install \
    npm start
```

### Arquivos de Environment

Para qualquer método de inicialização do projeto, deve-se realizar a configuração de cada serviço
por meio de seus respectivos arquivos `.env`. *Caso contrário, ocorrerá exceções logo na inicialização
ou, em piores casos, no ambinte de produção*.

- Todos os serviços deverão ter uma configuração de banco específica, conforme esta:

```env
DB_HOST="127.0.0.1"
DB_PORT=3306
DB_USERNAME="auser"
DB_PASSWORD="apass"
DB_NAME="sc2a_db"
```

- Além disso, o serviço de assinaturas válidas (`ServicoAssinaturasValidas`) deverá ter, adicionalmente, a
seguinte variável (especificando a URL do serviço de cadastramento - `ServicoCadastramento`):

```env
BASEURL_CADASTRAMENTO="http://localhost:3000/servcad"
```

### Populando o Banco de Dados

Para popular o banco de dados é necessário executar o comando de população na raíz do repositório, conforme
a seguir:

```bash
$ npm run startup-requests
```

> O comando deve ser executado em paralelo com a API completa (`npm start` para dev., ou outra
> instância de produção).

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
