# Serviço de Cadastramento ('ServicoCadastramento')

Esse é o serviço responsável pelo gerenciamento e administração do banco de dados e requisições
de entrada dos clientes. Ele permite o registro e a consulta das informações referentes ao cadastramento
das instâncias cadastradas no sistema.

## Endpoints

Este serviço apresenta os seguintes _endpoints_:

- **/servcad/clientes' (GET):** Retorna uma lista com todos os clientes cadastrados.
- **'/servcad/aplicativos' (GET):** Retorna uma lista com todos os aplicativos cadastrados.
- **'/servcad/assinaturas' (POST):** Cria uma assinatura a partir do padrão `{ código do cliente, código do aplicativo }`.
- **'/servcad/aplicativos/:id' (PATCH):** Atualiza o custo mensal de um aplicativo registrado no sistema.
- **'/servcad/assinaturas/{tipo} (GET):** Retorna uma lista com todas as assinaturas vigentes.
- **'/servcad/asscli/:codigo (GET):** Retorna uma lista das assinaturas do cliente informado.
- **'/servcad/assapp/:codigo (GET):** Retorna uma lista das assinaturas do aplicativo informado.

## Script de População

O _script de população_ serve para realizar a entrada das informações para teste e para formulação básica do
sistema. Isso é feito por meio da adição de dados de 10 clientes, 5 aplicativos e 5 assinaturas como entidades
fictícias, pelo lado dos testes, e de 1 usuário mestre (empresa administradora), pelo lado das regras de
negócio.

``` bash
# Rodando o script para adição de dados iniciais ao sistema
$ npm run startup-requests
```

> OBS.: É estritamente necessário realizar a execução deste _script_ **APENAS** após a execução dos serviços
> do sistema. Sem isso, o _script_ não conseguirá realizar os _endpoints_ de registro do sistema para 
> realizar a população do banco.
