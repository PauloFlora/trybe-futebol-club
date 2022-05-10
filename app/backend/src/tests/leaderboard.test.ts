import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

chai.use(chaiHttp);
const { expect } = chai;

const mockTeams = [
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

const mockMatches = [
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

let TeamsStub: sinon.SinonStub;
let MatchesStub: sinon.SinonStub;

describe('Ao fazer uma requisição GET à rota', () => {
  beforeEach(function() {
    TeamsStub = sinon.stub(Teams, 'findAll');
    MatchesStub = sinon.stub(Matches, 'findAll');
  });
  afterEach(() => {
    TeamsStub.restore();
    MatchesStub.restore();
  })
  it('/leaderboard/home, recebe a resposta 200', async () => {
    TeamsStub.resolves(mockTeams as any);
    MatchesStub.resolves(mockMatches as any)
    const chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

    const result = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(result).to.be.an('array');
  })
  it('/leaderboard/away, recebe a resposta 200', async () => {
    TeamsStub.resolves(mockTeams as any);
    MatchesStub.resolves(mockMatches as any)
    const chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

    const result = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(result).to.be.an('array');
  })
  it('/leaderboard, recebe a resposta 200', async () => {
    TeamsStub.resolves(mockTeams as any);
    MatchesStub.resolves(mockMatches as any)
    const chaiHttpResponse = await chai.request(app).get('/leaderboard');

    const result = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(result).to.be.an('array');
  })
 
});

