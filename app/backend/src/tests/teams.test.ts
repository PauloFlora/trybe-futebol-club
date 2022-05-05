import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import Teams from '../database/models/TeamsModel';
import TeamsController from '../controller/Teams';

chai.use(chaiHttp);
const { expect } = chai;

describe('Ao fazer uma requisição GET à rota /teams ', () => {
  it('retorna a resposta 200 a lista com 16 times', async () => {
    const chaiHttpResponse = await chai.request(app).get('/teams')
    const teams = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(teams).to.be.an('array');
    expect(teams).to.have.length(16)
  })
});

describe('Ao fazer uma requisição GET à rota /teams/:id ', () => {
  it('retorna a resposta 200 e o time específico', async () => {
    const chaiHttpResponse = await chai.request(app).get('/teams/2')
    const team = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(team).to.deep.equal({
      id: 2,
      teamName: "Bahia"
    })
  })
});
