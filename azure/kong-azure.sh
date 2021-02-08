#Use this to deploy Kong API Gateway to Azure given a configured database
# First setup the Postgres DB and the database that will be used for Kong
#Kong Migrations
az container create --name kong-migrations \
                       --resource-group rg-tcc-puc \
                       --image kong:latest \
                       --restart-policy Never \
                       --environment-variables KONG_PG_HOST="kong-database-host" \
                                               KONG_PG_USER="kong-user" \
                                               KONG_PG_PASSWORD="kong-password" \
                                               KONG_PG_DATABASE="kong" \
                       --command-line "kong migrations bootstrap"


#Kong API Gateway
az container create --name kong-gateway \
                       --dns-name-label kong-gateway \
                       --resource-group rg-tcc-puc \
                       --image kong:latest \
                       --port 8000 8443 8001 8444 \
                       --environment-variables KONG_PG_HOST="kong-database-host" \
                                               KONG_PG_DATABASE="kong" \
                                               KONG_PG_USER="kong-user" \
                                               KONG_PG_PASSWORD="kong-password" \
                                               KONG_PROXY_ACCESS_LOG="/dev/stdout" \
                                               KONG_ADMIN_ACCESS_LOG="/dev/stdout" \
                                               KONG_PROXY_ERROR_LOG="/dev/stderr" \
                                               KONG_ADMIN_ERROR_LOG="/dev/stderr" \
                                               KONG_ADMIN_LISTEN="0.0.0.0:8001, 0.0.0.0:8444 ssl"
