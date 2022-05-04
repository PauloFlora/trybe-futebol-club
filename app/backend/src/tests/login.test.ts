import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

import Users from '../database/models/UsersModel';
import LoginController from '../controller/Login';

chai.use(chaiHttp);
const { expect } = chai;

describe('Quando o Login é feito com sucesso', () => {
  it('recebe a resposta 200 e o token', async () => {
    const chaiHttpResponse: Response = await chai.request(app).post('/login')
    .send({ email: 'admin@admin.com', password: 'secret_admin' })

    const { user: { username }, token } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(token).not.to.be.undefined;
    expect(username).to.be.equal('Admin');
  })
});
