import { ServiceResponse } from '../types/ServiceResponse';
import IMatch from '../Interfaces/matches/IMatch';
import MatchesModel from '../models/MatchesModel';
import { UpdateScoreboardPayload } from '../types/UpdateScoreboardPayload';

export default class MatchesService {
  private matchesModel = new MatchesModel();

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
}
