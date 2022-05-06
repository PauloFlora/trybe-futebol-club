import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';

import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

// describe('Ao fazer uma requisição GET à rota /teams ', () => {
//   it('retorna a resposta 200 a lista com 16 times', async () => {
//     const chaiHttpResponse = await chai.request(app).get('/teams')
//     const teams = chaiHttpResponse.body;

//     expect(chaiHttpResponse.status).to.be.equal(200);
//     expect(teams).to.be.an('array');
//     expect(teams).to.have.length(16)
//   })
// });

// describe('Ao fazer uma requisição GET à rota /teams/:id ', () => {
//   it('retorna a resposta 200 e o time específico', async () => {
//     const chaiHttpResponse = await chai.request(app).get('/teams/2')
//     const team = chaiHttpResponse.body;

//     expect(chaiHttpResponse.status).to.be.equal(200);
//     expect(team).to.deep.equal({
//       id: 2,
//       teamName: "Bahia"
//     })
//   })
// });

describe('Requisição para a rota /teams', () => {
  it('retorna status 200', () => {
    chai.request(app)
      .get('/teams')
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });

  it(' pesquisando por um determinado ID, retorna status 200', () => {
    chai.request(app)
      .get('/teams/5')
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });

  it('com ID incorreto, retorna status 404', () => {
    chai.request(app)
      .get('/teams/50')
      .end((err, res) => {
        expect(res).to.have.status(404);
      });
  });
});