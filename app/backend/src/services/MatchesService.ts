import IMatch from '../Interfaces/matches/IMatch';
import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';
import { NewMatchPayload } from '../types/NewMatchPayload';
import { ServiceResponse } from '../types/ServiceResponse';
import { UpdateScoreboardPayload } from '../types/UpdateScoreboardPayload';

export default class MatchesService {
  private matchesModel = new MatchesModel();
  private teamsModel = new TeamsModel();

  public async getAll(q: string | undefined): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchesModel.findAll(q);
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async endsMatch(id: number): Promise<ServiceResponse<null>> {
    await this.matchesModel.endsMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updatesScoreboard(payload: UpdateScoreboardPayload): Promise<ServiceResponse<null>> {
    await this.matchesModel.updatesScoreboard(payload);
    return { status: 'SUCCESSFUL', data: { message: 'Scoreboard updated' } };
  }

  public async createsMatch(payload: NewMatchPayload): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = payload;
    if (homeTeamId === awayTeamId) {
      return {
        status: 'UNPROCESSABLE',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }
    const rivals = await this.teamsModel.findTwoTeams(homeTeamId, awayTeamId);
    if (rivals.length !== 2) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }
    const createdMatch = await this.matchesModel.createsMatch(payload);
    return { status: 'CREATED', data: createdMatch };
  }
}
