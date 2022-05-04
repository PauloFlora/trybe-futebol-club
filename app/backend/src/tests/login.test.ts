import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import Users from '../database/models/UsersModel';
import LoginController from '../controller/Login';

chai.use(chaiHttp);
const { expect } = chai;

describe('Quando o Login é feito com sucesso', () => {
  it('recebe a resposta 200 e o token', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login')
    .send({ email: 'admin@admin.com', password: 'secret_admin' })

    const { user: { username }, token } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(token).not.to.be.undefined;
    expect(username).to.be.equal('Admin');
  })
});

describe('Quando o Login falhar', () => {
  it('por não ter sido enviado um email, recebe o status 400', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login')
    .send({ password: 'secret_admin' })

    expect(chaiHttpResponse.status).to.be.equal(400);
  })
});

describe('Ao fazer uma requisição GET ao Login com um token válido', () => {
  it('retorna o papel do usuário', async () => {
    const chaiHttpPOSTResponse = await chai.request(app).post('/login')
    .send({ email: 'admin@admin.com', password: 'secret_admin' })

    const { user: { username }, token } = chaiHttpPOSTResponse.body;

    const chaiHttpGETResponse = await chai.request(app).get('/login/validate').set('authorization', token)

    //set utilizado aqui para definir a chave authorization e passar o token

    const data = chaiHttpGETResponse.body;

    console.log(data);
    

    expect(chaiHttpGETResponse.status).to.be.equal(200);
    expect(data).to.be.equal('admin');
  })
});
