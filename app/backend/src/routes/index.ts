import { Router } from 'express';
import TeamsRoutes from './TeamsRoutes';
import UsersRoutes from './UsersRoutes';
import MatchesRoutes from './MatchesRoutes';

export default class MainRouter {
  private router: Router;
  private teamsRouter: TeamsRoutes;
  private usersRouter: UsersRoutes;
  private matchesRoute: MatchesRoutes;

  constructor() {
    this.router = Router();
    this.teamsRouter = new TeamsRoutes();
    this.usersRouter = new UsersRoutes();
    this.matchesRoute = new MatchesRoutes();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/teams', this.teamsRouter.getRouter());
    this.router.use('/login', this.usersRouter.getRouter());
    this.router.use('/matches', this.matchesRoute.getRouter());
  }

  public getRouter() {
    return this.router;
  }
}
