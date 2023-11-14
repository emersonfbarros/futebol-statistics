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

  it('get "/teams" route should return all teams', async function() {
    const mockTeams = TeamsModel.bulkBuild(mock.teams);
    sinon.stub(TeamsModel, 'findAll').resolves(mockTeams);
    const { status, body } = await request(app).get('/teams');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(mock.teams);
  });

  it('get "/teams/:validId" route should return only one team', async function() {
    const [firstTeam] = mock.teams;
    const mockTeam = TeamsModel.build(firstTeam);
    sinon.stub(TeamsModel, 'findByPk').resolves(mockTeam);
    const { status, body } = await request(app).get('/teams/1');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(firstTeam);
  });
});
