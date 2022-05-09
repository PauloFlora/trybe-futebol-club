import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';

import { app } from '../app';
import Teams from '../database/models/TeamsModel';

chai.use(chaiHttp);
const { expect } = chai;

const mock = [
  {
    id: 1,
    teamName: 'Bahia'
  },
  {
    id: 2,
    teamName: 'Internacional'
  },
  {
    id: 3,
    teamName: 'Botafogo'
  },
  {
    id: 4,
    teamName: 'Cruzeiro'
  },
]

let TeamsStub: any;

describe('Ao fazer uma requisição GET à rota /teams ', () => {
  beforeEach(function() {
    TeamsStub = sinon.stub(Teams, 'findAll');
  });
  afterEach(() => {
    TeamsStub.restore();
  })
  it('retorna a resposta 200 a lista com 16 times', async () => {
    TeamsStub.resolves(mock)
    const chaiHttpResponse = await chai.request(app).get('/teams')
    const teams = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(teams).to.be.an('array');
    expect(teams).to.have.length(4)
  })
});

describe('Ao fazer uma requisição GET à rota /teams/:id ', () => {
  beforeEach(function() {
    TeamsStub = sinon.stub(Teams, 'findAll');
  });
  afterEach(() => {
    TeamsStub.restore();
  })
  it('retorna a resposta 200 e o time específico', async () => {
    TeamsStub.resolves(mock)
    const chaiHttpResponse = await chai.request(app).get('/teams/2')
    const team = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(team[0]).to.deep.equal({
      id: 1,
      teamName: "Bahia"
    })
  })
});
