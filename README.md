# SC2A - Módulo Backend

Código do módulo _backend_ do Sistema de Controle de Assinaturas de Aplicativos, baseado
na lógica de validação de aplicativos de celular.

## Instalação de Dependências

```bash
$ npm install
```

## Rodando a API

```bash
# development
$ npm start
```

### Populando o Banco de Dados

Para popular o banco de dados é necessário executar o seguinte comando:

```bash
$ npm run startup-requests
```

> O comando deve ser executado em paralelo com a API (`npm start` para dev., ou outra instância de produção).

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
