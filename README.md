## O que é o TFC? 

O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

O objetivo do projeto é desenvolver uma API, utilizando o método TDD, integrando as aplicações por meio de docker-compose para funcionar consumindo um banco de dados.

Para isto, foi construído um back end dockerizado utilizando modelagem de dados através do Sequelize, respeitando as regras de negócio estabelecidas no desafio, sendo possível que a API construída seja consumida pelo Front End já provido pelo projeto. 

Objetivos concluídos: 
 - Realizar a dockerização dos apps, network, volume e compose;
 - Modelar dados com **MySQL** através do **Sequelize**;
 - Criar e associar tabelas usando `models` do `sequelize`;
 - Construir uma **API REST** com endpoints para consumir os models criados;
 - Fazer um `CRUD` utilizando `ORM`;

## Para executar o projeto:

1. Clone o repositório
  * `git clone https://github.com/PauloFlora/trybe-futebol-club.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd trybe-futebol-club`

2. Instale as dependências
  * `npm install`
  * `npm install:apps`

3. Entre na pasta app/ e rode o comando do docker-compose
  * `cd app/`
  * `npm run compose:up`

4. Entre nas pastas de Front e Back end e rode e inicia as aplicações:
  * `cd backend/`
  * `npm start`
  * E depois: 
    * `cd frontend/`
    * `npm start`
