import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import Defaults from '../utils/Defaults';

export default class MatchesController {
  private matchesService = new MatchesService();

  public async getAll(_req: Request, res: Response) {
    const { status, data } = await this.matchesService.getAll();
    res.status(Defaults.getHttpCode(status)).json(data);
  }
}
