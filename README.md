# Projeto Backend para teste da VIZIR

> Projeto criado resolução do problema de custo de chamada

### Tecnologias Usadas
* NodeJS
* Jest
* JWT
* Sequelize
* Express
* Sucrase

## Pré-requisitos
* Para utilizar o backend você precisa do mysql ou mariadb instalado
* Crie um banco de dados de nome 'vizir_test' ou altere o DB_NAME dentro do .env
* Alterar configurações acesso do banco de dados dentro do arquivo .env caso necessário

### Passos para executar testes via NPM
1. `npm install`
2. `npm sequelize db:migrate`
3. `npm sequelize db:seed:all`
4. `npm test`

### Passos para executar testes via Yarn
1. `yarn install`
2. `yarn sequelize db:migrate`
3. `yarn sequelize db:seed:all`
4. `yarn test`

### Para deixar o servidor rodando para o frontend e testes usando uma suite REST com NPM
1. `npm dev` --> Inicia em modo debug colocando as saídas no console
2. `npm start` --> Inicia em modo de produção

### Para deixar o servidor rodando para o frontend e testes usando uma suite REST com Yarn
1. `yarn dev` --> Inicia em modo debug colocando as saídas no console
2. `yarn start` --> Inicia em modo de produção

**Algumas outras ações como criar, editar e excluir foram implementadas no backend porém não serão no frontend**

