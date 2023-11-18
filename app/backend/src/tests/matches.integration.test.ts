import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import mock from './mocks';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect, request } = chai;

describe('App', function () {
  const invalidTokenMessage = 'Token must be a valid token';
  const notFoundTokenMessage = 'Token not found';

  afterEach(function () {
    sinon.restore();
  });

  it('GET "/matches" should return all matches with no filters', async function () {
    const allMatchesMock = MatchesModel.bulkBuild(mock.matches.allMatches);

    sinon.stub(MatchesModel, 'findAll').resolves(allMatchesMock);

    const { status, body } = await request(app).get('/matches');

    expect(status).to.be.equal(mock.httpStatus.successful);
    expect(body).to.be.deep.equal(mock.matches.allMatches);
  });

  it('GET "/matches?inProgress=true" should return all matches in progress', async function () {
    const inProgressMatchesMock = MatchesModel.bulkBuild(mock.matches.inProgressMatches);

    sinon.stub(MatchesModel, 'findAll').resolves(inProgressMatchesMock);

    const { status, body } = await request(app).get('/matches?inProgress=true');

    expect(status).to.be.equal(mock.httpStatus.successful);
    expect(body).to.be.deep.equal(mock.matches.inProgressMatches);
  });

  it('GET "/matches?inProgress=false" should return all matches in progress', async function () {
    const finishedMatchesMock = MatchesModel.bulkBuild(mock.matches.finishedMatches);

    sinon.stub(MatchesModel, 'findAll').resolves(finishedMatchesMock);

    const { status, body } = await request(app).get('/matches?inProgress=true');

    expect(status).to.be.equal(mock.httpStatus.successful);
    expect(body).to.be.deep.equal(mock.matches.finishedMatches);
  });

  it('PATCH "/matches/:validId/finish" with valid token should message informing that match has been completed', async function () {
    const matchToEndMock = MatchesModel.build(mock.matches.matchToEnd);

    sinon.stub(MatchesModel, 'findOne').resolves(matchToEndMock);

    const { status, body } = await request(app)
      .patch('/matches/1/finish')
      .set('authorization', `Bearer ${mock.login.validToken}`);

    expect(status).to.be.equal(mock.httpStatus.successful);
    expect(body).to.be.deep.equal({ message: 'Finished' });
  });

  it('PATCH "/matches/:validId/finish" with invalid token should return message error', async function () {
    const { status, body } = await request(app)
      .patch('/matches/1/finish')
      .set('authorization', `Bearer ${mock.login.invalidToken}`);

    expect(status).to.be.equal(mock.httpStatus.unauthorized);
    expect(body).to.be.deep.equal({ message: invalidTokenMessage });
  });

  it('PATCH "/matches/:validId/finish" without token should return message error', async function () {
    const { status, body } = await request(app)
      .patch('/matches/1/finish')
      .set('authorization', 'Bearer');

    expect(status).to.be.equal(mock.httpStatus.unauthorized);
    expect(body).to.be.deep.equal({ message: notFoundTokenMessage });
  });

  it('PATCH "/matches/:validId/finish" with non sense data in authorization header should return message error', async function () {
    const { status, body } = await request(app)
      .patch('/matches/1/finish')
      .set('authorization', 'token');

    expect(status).to.be.equal(mock.httpStatus.unauthorized);
    expect(body).to.be.deep.equal({ message: notFoundTokenMessage });
  });
});
