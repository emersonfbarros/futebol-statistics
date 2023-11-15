import { ServiceResponse } from '../Interfaces/service/ServiceResponse';
import ITeam from '../Interfaces/teams/ITeam';
import TeamsModel from '../models/TeamsModel';

export default class TeamsService {
  private teamsModel = new TeamsModel();

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const teamById = await this.teamsModel.findById(id);
    if (!teamById) {
      return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    }
    return { status: 'SUCCESSFUL', data: teamById };
  }
}
