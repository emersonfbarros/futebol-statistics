import { Request, Response, Router } from 'express';
import LeaderboadsController from '../controllers/LeaderboarsController';

export default class LeaderboardRoutes {
  private router: Router;
  private leaderboardController: LeaderboadsController;

  constructor() {
    this.router = Router();
    this.leaderboardController = new LeaderboadsController();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/:teamType', (req: Request, res: Response) =>
      this.leaderboardController.getHomeTeamPerformance(req, res));
  }

  public getRouter() {
    return this.router;
  }
}
