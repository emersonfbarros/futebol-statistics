import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';

export default class MatchesRoutes {
  private router: Router;
  private matchesController: MatchesController;

  constructor() {
    this.router = Router();
    this.matchesController = new MatchesController();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/',
      (req: Request, res: Response) =>
        this.matchesController.getAll(req, res),
    );
  }

  public getRouter() {
    return this.router;
  }
}
