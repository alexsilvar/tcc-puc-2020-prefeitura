# TCC PUC 2020 - Arquitetura de Software Distribuído

Este repositório é a parte prática, POC, do Trabalho de Conclusão de Curso do  aluno Alexsander Ramos da Silva do ano de 2020.

Ele é composto pelas soluções desenvolvidas com intuito de provar a eficácia da arquitetura proposta para a solução da situação problema.

Todas as opções escolhidas são Open Source, focando o mínimo uso de recursos financeiros na sua implementação

## Componentes

### Módulo de Integração Geral - CORE
Este componente trata-se do API Gateway repsonsável pela integração do sistema. Ele foi desenvolvido usando os elementos Kong que é o gateway em sí, Konga que é uma GUI com o intuito de facilitar as operações do Kong, um Banco de dados PostgreSQL utilizado pelo Kong e PGAdmin uma unidade frontend para acessar e gerenciar o banco de dados caso seja necessário.

O módulo de Integração é dependente do Módulo ms-auth que realiza cadastro e login dos usuários retornando tokens válidos usados pelo Kong API Gateway para autorizar requests.

### Web Cidadão
Página web em Angular que dá acesso ao cadastro e a solicitações aos Cidadãos de Bom destino.

### Web Prefeitura
Módulo a ser utilizado pelos funcionários públicos
### Módulo Cidadão
- Microsserviço que realiza ações para os cidadãos e permite aos funcionários públicos realizarem cadastros de informações do IPTU/ITR.
- Cidadãos conseguem ver seus dados de IPTU/ITR

### Módulo Georreferencial
Não Implantado na POC
### Módulo Gestão de Projetos
Não Implantado na POC

## Live Demo

Para a avaliação da Banca, este projeto encontra-se disponível no link do documento entregue.
## License
[MIT](https://choosealicense.com/licenses/mit/)