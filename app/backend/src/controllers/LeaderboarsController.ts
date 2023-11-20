import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardsService';
import Defaults from '../utils/Defaults';

export default class LeaderboadsController {
  private leaderboardsSerice = new LeaderboardService();

  public async getHomeTeamPerformance(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardsSerice.getHomeTeamsStats();
    res.status(Defaults.getHttpCode(status)).json(data);
  }
}
