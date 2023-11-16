import * as chai from 'chai';
import * as sinon from 'sinon';
import jwt, { Secret } from 'jsonwebtoken';
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

  it(
    'POST "/login" with valid password, but incorrect, and valid email found in db should return error message with http code 401',
    async function() {
      const { id, username, role, email, password } = mock.login.userOnDb;
      const mockUserFound = UserModel.build({ id, username, role, email, password });

      sinon.stub(UserModel, 'findOne').resolves(mockUserFound);

      const { status, body } = await request(app)
        .post('/login')
        .send({ email, password: mock.login.invalid[1].password });

      expect(status).to.be.equal(mock.httpStatus.unauthorized);
      expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
    },
  );

  it(
    'GET "/login/role" without token in authorization header should return error message with http code 401',
    async function() {
      const { status, body } = await request(app)
        .get('/login/role')
        .set('authorization', 'Bearer ');
      expect(status).to.be.equal(mock.httpStatus.unauthorized);
      expect(body).to.be.deep.equal({ message: 'Token not found' });
    },
  );

  it(
    'GET "/login/role" without invalid token in authorization header should return error message with http code 401',
    async function() {
      const { status, body } = await request(app)
        .get('/login/role')
        .set('authorization', `Bearer ${mock.login.invalidToken}`);
      expect(status).to.be.equal(mock.httpStatus.unauthorized);
      expect(body).to.be.deep.equal({ message: 'Token must be a valid token' });
    },
  );

  it(
    'POST "/login" with valid email and password found in db should retun a token with http code 200',
    async function() {
      const { id, username, role, email, password, rawPassword } = mock.login.userOnDb;
      const mockUserFound = UserModel.build({ id, username, role, email, password });

      const jwtSignStub = (sinon.stub(jwt, 'sign') as unknown as sinon.SinonStub<
        [{ id: number }, Secret],
        string
      >).returns(mock.login.validToken);
      sinon.stub(UserModel, 'findOne').resolves(mockUserFound);

      const { status, body } = await request(app)
        .post('/login')
        .send({ email, password: rawPassword });

      const jwtSignArgs = jwtSignStub.getCall(0).args;

      expect(status).to.be.equal(mock.httpStatus.successful);
      expect(jwtSignArgs[0]).to.be.deep.equal({ id });
      expect(jwtSignArgs[1]).to.be.a('string');
      expect(body).to.be.deep.equal({ token: mock.login.validToken });
    },
  );
})
