import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import UserModel from '../database/models/UsersModel';
import mock from './mocks';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect, request } = chai;

describe('App', function() {
  afterEach(function() {
    sinon.restore();
  });

  it(
    'POST "/login" with empty password or email should return error message with http code 400',
    async function() {
      mock.login.empty.forEach(async (input) => {
        const { status, body } = await request(app).post('/login').send(input);
        expect(status).to.be.equal(mock.httpStatus.badReq);
        expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
      });
    },
  );

  it(
    'POST "/login" with invalid password or email should return error message with http code 401',
    async function() {
      mock.login.invalid.forEach(async (input) => {
        const { status, body } = await request(app).post('/login').send(input);
        expect(status).to.be.equal(mock.httpStatus.unauthorized);
        expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
      });
    },
  );
})
