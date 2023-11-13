# Usar a imagem node:16.14-alpine como base
FROM node:16.14-alpine

# Mudar para o diretório de trabalho /app-backend
WORKDIR /app-backend

# Copiar os package.json, package-lock.json e packages.npm para o container
COPY ./package.json .
COPY ./package-lock.json .

# Instalar as dependências Node
RUN npm i

# Copiar o restante dos arquivos da aplicação para o container
COPY ./src ./src
COPY ./.eslintignore .
COPY ./.eslintrc.json .
COPY ./.sequelizerc .
COPY ./nyc.config.js .
COPY ./packages.npm .
COPY ./tsconfig.json .
COPY ./packages.npm .

# Sinalize que aplicação expõe a porta 3001
EXPOSE 3001

# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas
# Dica: Leia a seção Docker e Docker-compose no README para mais informações
ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
