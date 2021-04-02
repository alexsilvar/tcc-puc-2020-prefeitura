# Rodar em Docker localmente
Para rodar em docker localmente execute o comando ``docker-compose up`` neste diretório (ms-core). O deploy incluirá:
- Kong Gateway (Bootstrap)
- PostgreSQL Database (Armazena configurações Kong e Konga)
- pgadmin4 (manager de Postgre DB)
- Konga (UI para gerenciar Kong Gateway)

Primeiramente é necessário configurar o arquivo .env dos microsserviços e rodar as migrations, apontando para o banco gerado no passo anterior. garanta que ele possúa os bancos e credenciais configurados, então rode o seguinte comando:

```
npm run migrate
```

O banco postgresql precisa das extensões ``pgcrypto`` e ``uuid-ossp``, então instale-as.

Para configurar o microserviço de autenticação é preciso criar uma chave JWT no Kong e utilizar o ``secret`` e a ``key`` como variável de ambiente ao microsserviço ``ms-auth``, pois isso é utilizado para a geração dos Tokens JWT.


# Rodar na AWS

- Popular os dados de conexão com banco PostgreSQL (hostname, username e password)
- Para executar o Módulo Core em AWS basta utilizar a funcionalidade ``Elastic Beanstalk`` passando o docker-compose-aws.yml 
- Nas regras de Segurança do EC2 expor as portas 8000, 8001 e 1337.
- Configurar o Konga utilizando a referência http://kong:8001 (referencia ao link de container)
- Desabilitar a descoberta da porta 8001, apenas Konga poderá visualizar esta referencia internamente

# Postman

No arquivo Kong and Konga, há exemplos das chamadas possíveis para o Kong API Gateway, para realizar a configuração do Konga. Mas o ideal é seguir as instruções no site do Konga.