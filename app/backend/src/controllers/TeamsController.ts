import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import httpCodesMap from '../utils/httpCodesMap';

export default class TeamsController {
  private teamsService = new TeamsService();

  public async getAllTeams(_req: Request, res: Response) {
    const { status, data } = await this.teamsService.getAllTeams();
    res.status(httpCodesMap[status]).json(data);
  }
}