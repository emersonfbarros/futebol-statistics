import { Router } from 'express';
import TeamsRoutes from './TeamsRoutes';
import UsersRoutes from './UsersRoutes';

export default class MainRouter {
  private router: Router;
  private teamsRouter: TeamsRoutes;
  private usersRouter: UsersRoutes;

  constructor() {
    this.router = Router();
    this.teamsRouter = new TeamsRoutes();
    this.usersRouter = new UsersRoutes();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/teams', this.teamsRouter.getRouter());
    this.router.use('/login', this.usersRouter.getRouter());
  }

  public getRouter() {
    return this.router;
  }
}
