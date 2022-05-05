import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import Matches from '../database/models/MatchesModel';
import MatchesController from '../controller/Matches';

chai.use(chaiHttp);
const { expect } = chai;

describe('Ao fazer uma requisição GET à rota /matches ', () => {
  it('retorna a resposta 200 a lista com 48 times', async () => {
    const chaiHttpResponse = await chai.request(app).get('/matches')
    const matches = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(matches).to.be.an('array');
    expect(matches).to.have.length(48)
  })
});
