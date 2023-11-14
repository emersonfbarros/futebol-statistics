import { Router } from 'express';
import TeamsRoutes from './TeamsRoutes';

export default class MainRouter {
  private router: Router;
  private teamsRouter: TeamsRoutes;

  constructor() {
    this.router = Router();
    this.teamsRouter = new TeamsRoutes();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/teams', this.teamsRouter.getRouter());
  }

  public getRouter() {
    return this.router;
  }
}
