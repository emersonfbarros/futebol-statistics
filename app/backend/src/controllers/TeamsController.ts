import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import Defaults from '../utils/Defaults';

export default class TeamsController {
  private teamsService = new TeamsService();

  public async getAllTeams(_req: Request, res: Response) {
    const { status, data } = await this.teamsService.getAllTeams();
    res.status(Defaults.getHttpCode(status)).json(data);
  }

  public async getTeamById({ params: { id } }: Request, res: Response) {
    const { status, data } = await this.teamsService.getTeamById(Number(id));
    res.status(Defaults.getHttpCode(status)).json(data);
  }
}
