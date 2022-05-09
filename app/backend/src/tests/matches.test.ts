import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesModel';

chai.use(chaiHttp);
const { expect } = chai;

let MatchesStub: any;

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

describe('Ao fazer uma requisição GET à rota /matches ', () => {
  beforeEach(function() {
    MatchesStub = sinon.stub(Matches, 'findAll');
  });
  afterEach(() => {
    MatchesStub.restore();
  })
  it('retorna a resposta 200 a lista com 48 times', async () => {
    MatchesStub.resolves(mock)
    const chaiHttpResponse = await chai.request(app).get('/matches')
    const matches = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(matches).to.be.an('array');
    expect(matches).to.have.length(4)
  })
});


// describe('Requisição para a rota /matches', () => {
//   it('etorna status 200', () => {
//     chai.request(app)
//       .get('/matches')
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//       });
//   });
//   it('com a rota /id:/finish, retorna status 200', () => {
//     chai.request(app)
//       .patch('/matches/1/finish')
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//       });
//   });

//   it('com a rota /:id, retorna status 200', () => {
//     chai.request(app)
//       .patch('/matches/2')
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//       });
//   });

//   it('com a rota /:id, editando o match, retorna status 200', () => {
//     chai.request(app)
//       .patch('/matches/2')
//       .send({
//         homeTeamGoals: 10,
//         awayTeamGoals: 6,
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//       });
//   });
// });
