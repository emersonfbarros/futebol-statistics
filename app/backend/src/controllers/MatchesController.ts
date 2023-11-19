import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import Defaults from '../utils/Defaults';

export default class MatchesController {
  private matchesService = new MatchesService();

  public async getAll({ query: { inProgress } }: Request, res: Response) {
    const { status, data } = await this.matchesService
      .getAll(inProgress as string | undefined);
    res.status(Defaults.getHttpCode(status)).json(data);
  }

  public async endsMatch({ params: { id } }: Request, res: Response) {
    const { status, data } = await this.matchesService.endsMatch(Number(id));
    res.status(Defaults.getHttpCode(status)).json(data);
  }

  public async updatesScoreboard({ params: { id }, body }: Request, res: Response) {
    const { status, data } = await this.matchesService.updatesScoreboard({ ...body, id });
    res.status(Defaults.getHttpCode(status)).json(data);
  }

  public async createsMatch({ body }: Request, res: Response) {
    const { status, data } = await this.matchesService.createsMatch(body);
    res.status(Defaults.getHttpCode(status)).json(data);
  }
}
