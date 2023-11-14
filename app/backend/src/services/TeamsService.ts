import { ServiceResponse } from '../Interfaces/service/ServiceResponse';
import ITeam from '../Interfaces/teams/ITeam';
import TeamsModel from '../models/TeamsModel';

export default class TeamsService {
  private teamsModel = new TeamsModel();

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allBooks = await this.teamsModel.findAll();
    return { status: 'successful', data: allBooks };
  }
}
