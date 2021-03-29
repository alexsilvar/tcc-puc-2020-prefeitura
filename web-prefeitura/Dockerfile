FROM node:14.16.0-alpine AS build

WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run build -- --prod

FROM nginx:1.19.7-alpine
COPY --from=build /app/dist/web-prefeitura /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]