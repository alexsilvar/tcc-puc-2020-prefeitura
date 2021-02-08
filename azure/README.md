# Deploy na Azure

Para realiza o deploy em azure, por se tratar de uma aplicação multi containeres, foi necessária uma adaptação de onde colocar os componentes. Os Módulos de Microsserviços, Módulos Web, Konga e pgadmin4, por precisarem de apenas uma porta para sua exposição, foram colocados em Azure Web Application em Containers. Já o Kong API Gateway, utiliza a tecnologia Azure Container Instance (ACI) pois precisa de diversas portas expostas.

## Kong Gateway
Para realizar o deploy do Kong em azure utilizando Azure Container Instances execute os comandos na linha de comando do portal azure.

## Konga
Para realizar o deploy do Konga, crie um Azure Web App Service para containers e utilize o arquivo ``docker-compose-konga.yml`` substituindo a string de conexão DB_URI.

## Demais Módulos
Os módulos web e de microsserviços desenvolvidos utilizam CI/CD para deploy nos respectivos Azure Web App em Container.