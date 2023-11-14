import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import mock from './mocks';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect, request } = chai;

describe('App', function() {
  afterEach(function () {
    sinon.restore();
  });

  it('get "/teams" route should return all teams with http status 200', async function() {
    const mockTeams = TeamsModel.bulkBuild(mock.teams);
    sinon.stub(TeamsModel, 'findAll').resolves(mockTeams);
    const { status, body } = await request(app).get('/teams');
    expect(status).to.be.equal(mock.httpStatus.successful);
    expect(body).to.be.deep.equal(mock.teams);
  });

  it('get "/teams/:validId" route should return only one team with http status 200', async function() {
    const [firstTeam] = mock.teams;
    const mockTeam = TeamsModel.build(firstTeam);
    sinon.stub(TeamsModel, 'findByPk').resolves(mockTeam);
    const { status, body } = await request(app).get('/teams/1');
    expect(status).to.be.equal(mock.httpStatus.successful);
    expect(body).to.be.deep.equal(firstTeam);
  });

  it(
    'get "/teams" should return message error with http status 500 if connection with db fails',
    async function() {
      sinon.stub(TeamsModel, 'findAll')
        .throws(new Error('Database connection failed'));
      const { status, body } = await request(app).get('/teams');
      expect(status).to.be.equal(mock.httpStatus.serverError);
      expect(body).to.be.deep.equal(mock.serverErrorMessage);
    },
  );
});
