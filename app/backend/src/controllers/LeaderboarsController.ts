import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardsService';
import Defaults from '../utils/Defaults';

export default class LeaderboadsController {
  private leaderboardsService = new LeaderboardService();

  public async getHomeTeamPerformance({ params: { teamType } }: Request, res: Response) {
    const { status, data } = await this.leaderboardsService.getTeamsStats(teamType);
    res.status(Defaults.getHttpCode(status)).json(data);
  }
}
