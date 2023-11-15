import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/TeamsController';

export default class TeamsRoutes {
  private router: Router;
  private teamsController: TeamsController;

  constructor() {
    this.router = Router();
    this.teamsController = new TeamsController();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/',
      (req: Request, res: Response) =>
        this.teamsController.getAllTeams(req, res),
    );

    this.router.get(
      '/:id',
      (req: Request, res: Response) =>
        this.teamsController.getTeamById(req, res),
    );
  }

  public getRouter() {
    return this.router;
  }
}
