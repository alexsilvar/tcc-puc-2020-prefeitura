# Rodar em Docker localmente

Para rodar em docker localmente execute o comando ``docker-compose up`` neste diretório. O deploy incluirá:
- Kong Gateway (Bootstrap)
- PostgreSQL Database (Armazena configurações Kong e Konga)
- pgadmin4 (manager de Postgre DB)
- Konga (UI para gerenciar Kong Gateway)
# Rodar na AWS

- Popular os dados de conexão com banco PostgreSQL (hostname, username e password)
- Para executar o Módulo Core em AWS basta utilizar a funcionalidade ``Elastic Beanstalk`` passando o docker-compose-aws.yml 
- Nas regras de Segurança do EC2 expor as portas 8000, 8001 e 1337.
- Configurar o Konga utilizando a referência http://kong:8001 (referencia ao link de container)
- Desabilitar a descoberta da porta 8001, apenas Konga poderá visualizar esta referencia internamente