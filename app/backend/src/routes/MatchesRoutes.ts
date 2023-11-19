import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import TokenValidation from '../middlewares/TokenValidation';

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

    this.router.patch(
      '/:id/finish',
      TokenValidation.validate,
      (req: Request, res: Response) =>
        this.matchesController.endsMatch(req, res),
    );

    this.router.patch(
      '/:id',
      TokenValidation.validate,
      (req: Request, res: Response) =>
        this.matchesController.updatesScoreboard(req, res),
    );
  }

  public getRouter() {
    return this.router;
  }
}
