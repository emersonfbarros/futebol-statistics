import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import SequelizeMatches from '../database/models/MatchesModel';
import SequelizeTeams from '../database/models/TeamsModel'
import mock from './mocks';
// @ts-ignore
import chaiHttp = require('chai-http');
import mocks from './mocks';

chai.use(chaiHttp);

const { expect, request } = chai;

describe('App', function () {
  const invalidTokenMessage = 'Token must be a valid token';
  const notFoundTokenMessage = 'Token not found';

  afterEach(function () {
    sinon.restore();
  });

  it('GET "/matches" should return all matches with no filters', async function () {
    sinon.stub(SequelizeMatches, 'findAll')
      .resolves(mock.matches.allMatches as unknown as SequelizeMatches[]);

    const { status, body } = await request(app).get('/matches');

    expect(status).to.be.equal(mock.httpStatus.successful);
    expect(body).to.be.deep.equal(mock.matches.allMatches);
  });

  it('GET "/matches?inProgress=true" should return all matches in progress', async function () {

    sinon.stub(SequelizeMatches, 'findAll')
      .resolves(mock.matches.inProgressMatches as unknown as SequelizeMatches[]);

    const { status, body } = await request(app).get('/matches?inProgress=true');

    expect(status).to.be.equal(mock.httpStatus.successful);
    expect(body).to.be.deep.equal(mock.matches.inProgressMatches);
  });

  it('GET "/matches?inProgress=false" should return all matches in progress', async function () {

    sinon.stub(SequelizeMatches, 'findAll')
      .resolves(mock.matches.finishedMatches as unknown as SequelizeMatches[]);

    const { status, body } = await request(app).get('/matches?inProgress=true');

    expect(status).to.be.equal(mock.httpStatus.successful);
    expect(body).to.be.deep.equal(mock.matches.finishedMatches);
  });

  it('PATCH "/matches/:validId/finish" with valid token should message informing that match has been completed', async function () {
    // const matchToEndMock = SequelizeMatches.build(mock.matches.matchToEnd);

    sinon.stub(SequelizeMatches, 'update').resolves([1]);

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
    expect(body).to.be.deep.equal({ message: invalidTokenMessage });
  });

  it('PATCH "/matches/:validId" with valid token should update the scoreboard', async function () {
    const matchToEndMock = SequelizeMatches.build(mock.matches.matchToEnd);

    sinon.stub(SequelizeMatches, 'findOne').resolves(matchToEndMock);

    const { status, body } = await request(app)
      .patch('/matches/1')
      .set('authorization', `Bearer ${mock.login.validToken}`)
      .send(mock.matches.scoreboardToUpdate);

    expect(status).to.be.equal(mock.httpStatus.successful);
    expect(body).to.be.deep.equal({});
  });

  it('PATCH "/matches/:validId" with invalid token should return error message', async function () {
    const { status, body } = await request(app)
      .patch('/matches/1')
      .set('authorization', `Bearer ${mock.login.invalidToken}`)
      .send(mock.matches.scoreboardToUpdate);

    expect(status).to.be.equal(mock.httpStatus.unauthorized);
    expect(body).to.be.deep.equal({ message: invalidTokenMessage });
  });

  it('PATCH "/matches/:validId" without token should return message error', async function () {
    const { status, body } = await request(app)
      .patch('/matches/1')
      .set('authorization', 'Bearer')
      .send(mock.matches.scoreboardToUpdate);

    expect(status).to.be.equal(mock.httpStatus.unauthorized);
    expect(body).to.be.deep.equal({ message: notFoundTokenMessage });
  });

  it('PATCH "/matches/:validId" with non sense data in authorization header should return message error', async function () {
    const { status, body } = await request(app)
      .patch('/matches/1')
      .set('authorization', 'token')
      .send(mock.matches.scoreboardToUpdate);

    expect(status).to.be.equal(mock.httpStatus.unauthorized);
    expect(body).to.be.deep.equal({ message: invalidTokenMessage });
  });

  it('POST "/matches" with valid body in the request should create new match and returns its data from db', async function () {
    const fullToCreate = {
      ...mock.matches.matchToCreate,
      id: 35,
      inProgress: true,
    };

    const mockFoundTeams = SequelizeTeams.bulkBuild([mocks.teams[7], mocks.teams[15]]);
    const mockMatchCreated = SequelizeMatches.build(fullToCreate);

    sinon.stub(SequelizeTeams, 'findAll').resolves(mockFoundTeams);
    sinon.stub(SequelizeMatches, 'create').resolves(mockMatchCreated);

    const { status, body } = await request(app)
      .post('/matches')
      .set('authorization', `Bearer ${mock.login.validToken}`)
      .send(mock.matches.matchToCreate);
    expect(status).to.be.equal(mock.httpStatus.created);
    expect(body).to.be.deep.equal(fullToCreate);
  });

  it('POST "/matches" with valid body in the request but the number of existing teams is different from two should return error message', async function () {
    const mockFoundTeam = SequelizeTeams.build(mocks.teams[15]);

    sinon.stub(SequelizeTeams, 'findAll').resolves([mockFoundTeam]);

    const { status, body } = await request(app)
      .post('/matches')
      .set('authorization', `Bearer ${mock.login.validToken}`)
      .send(mock.matches.matchToCreate);
    expect(status).to.be.equal(mock.httpStatus.notFound);
    expect(body).to.be.deep.equal({ message: 'There is no team with such id!' });
  });

  it('POST "/matches" with body with teams that have same id in the request should return error message', async function () {
    const { status, body } = await request(app)
      .post('/matches')
      .set('authorization', `Bearer ${mock.login.validToken}`)
      .send(mock.matches.invalidMatchToCreate);
    expect(status).to.be.equal(mock.httpStatus.unprocessable);
    expect(body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  });

  it('POST "/matches" with invalid token should return error message', async function () {
    const { status, body } = await request(app)
      .patch('/matches')
      .set('authorization', `Bearer ${mock.login.invalidToken}`)
      .send(mock.matches.matchToCreate);

    expect(status).to.be.equal(mock.httpStatus.unauthorized);
    expect(body).to.be.deep.equal({ message: invalidTokenMessage });
  });

  it('POST "/matches" without token should return message error', async function () {
    const { status, body } = await request(app)
      .post('/matches')
      .set('authorization', 'Bearer')
      .send(mock.matches.matchToCreate);

    expect(status).to.be.equal(mock.httpStatus.unauthorized);
    expect(body).to.be.deep.equal({ message: notFoundTokenMessage });
  });

  it('POST "/matches" with non sense data in authorization header should return message error', async function () {
    const { status, body } = await request(app)
      .post('/matches')
      .set('authorization', 'token')
      .send(mock.matches.matchToCreate);

    expect(status).to.be.equal(mock.httpStatus.unauthorized);
    expect(body).to.be.deep.equal({ message: invalidTokenMessage });
  });
});
