import { Router } from 'express';
import TeamsRoutes from './TeamsRoutes';
import UsersRoutes from './UsersRoutes';
import MatchesRoutes from './MatchesRoutes';
import LeaderboardRoutes from './LeaderboardsRoutes';

export default class MainRouter {
  private router: Router;
  private teamsRouter: TeamsRoutes;
  private usersRouter: UsersRoutes;
  private matchesRoute: MatchesRoutes;
  private leaderboardRoute: LeaderboardRoutes;

  constructor() {
    this.router = Router();
    this.teamsRouter = new TeamsRoutes();
    this.usersRouter = new UsersRoutes();
    this.matchesRoute = new MatchesRoutes();
    this.leaderboardRoute = new LeaderboardRoutes();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/teams', this.teamsRouter.getRouter());
    this.router.use('/login', this.usersRouter.getRouter());
    this.router.use('/matches', this.matchesRoute.getRouter());
    this.router.use('/leaderboard', this.leaderboardRoute.getRouter());
  }

  public getRouter() {
    return this.router;
  }
}
