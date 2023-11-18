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
  afterEach(function () {
    sinon.restore();
  });

  it('GET "/matches" should return all matches with no filters', async function () {
    const allMatchesMock = MatchesModel.bulkBuild(mock.matches.allMatches);

    sinon.stub(MatchesModel, 'findAll').resolves(allMatchesMock);

    const { status, body } = await request(app).get('/matches');

    expect(status).to.be.equal(mock.httpStatus.successful);
    expect(body).to.be.deep.equal(allMatchesMock);
  });

  it('GET "/matches?inProgress=true" should return all matches in progress', async function () {
    const inProgressMatchesMock = MatchesModel.bulkBuild(mock.matches.inProgressMatches);

    sinon.stub(MatchesModel, 'findAll').resolves(inProgressMatchesMock);

    const { status, body } = await request(app).get('/matches?inProgress=true');

    expect(status).to.be.equal(mock.httpStatus.successful);
    expect(body).to.be.deep.equal(inProgressMatchesMock);
  });
});
