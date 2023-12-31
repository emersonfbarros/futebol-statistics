import { Op } from 'sequelize';
import SequelizeTeams from '../database/models/TeamsModel';
import ITeam from '../Interfaces/teams/ITeam';
import ITeamModel from '../Interfaces/teams/ITeamModel';

export default class TeamsModel implements ITeamModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: number): Promise<ITeam | null> {
    const teamById = await this.model.findByPk(id);
    return teamById;
  }

  async findTwoTeams(homeTeamId: number, awayTeamId: number): Promise<ITeam[]> {
    const foundTeams = await this.model.findAll({
      where: { id: { [Op.or]: [homeTeamId, awayTeamId] } },
    });
    return foundTeams;
  }
}
