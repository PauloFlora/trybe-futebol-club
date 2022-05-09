import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/UsersModel';

chai.use(chaiHttp);
const { expect } = chai;

const mock = {
  id: 1,
  username: 'admin',
  role: 'admin',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  email: 'admin@admin.com'
};

const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJpYXQiOjE2NTIxMzczODQsImV4cCI6MTY1Mjc0MjE4NH0.me-fAMygsPsd33SHme0cpFIeJ57g0-bXejQ54hVOfmE'

let UsersStub: sinon.SinonStub;

describe('Ao fazer uma requisição POST à rota /login', () => {
  beforeEach(function() {
    UsersStub = sinon.stub(Users, 'findAll');
  });
  afterEach(() => {
    UsersStub.restore();
  })
  it('com email e password corretos, recebe a resposta 200 e o token', async () => {
    UsersStub.resolves(mock as any);
    const chaiHttpResponse = await chai.request(app).post('/login')
    .send({ email: 'admin@admin.com', password: 'secret_admin' })

    const { user: { username }, token } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(token).not.to.be.undefined;
    expect(username).to.be.equal('admin');
  })
  it('retorna o papel do usuário', async () => {
    UsersStub.resolves(mock as any);
  
    //set utilizado aqui para definir a chave authorization e passar o token
    const chaiHttpGETResponse = await chai.request(app).get('/login/validate').set('authorization', mockToken)
  
    const role = chaiHttpGETResponse.body;   
  
    expect(chaiHttpGETResponse.status).to.be.equal(200);
    expect(role).to.be.equal('admin');
  })
  it('sem um email, recebe o status 400', async () => {
    UsersStub.resolves(undefined);
    const chaiHttpResponse = await chai.request(app).post('/login')
    .send({ password: 'secret_admin' })
  
    expect(chaiHttpResponse.status).to.be.equal(400);
  })
});