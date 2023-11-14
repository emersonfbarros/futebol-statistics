import SequelizeTeams from '../database/models/TeamsModel';
import ITeam from '../Interfaces/teams/ITeam';
import ITeamModel from '../Interfaces/teams/ITeamModel';

export default class TeamsModel implements ITeamModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}
