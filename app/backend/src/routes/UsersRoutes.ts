import { Request, Response, Router } from 'express';
import UsersController from '../controllers/UsersController';
import ValidateLoginData from '../middlewares/LoginDataValidation';

export default class UsersRoutes {
  private router: Router;
  private usersController: UsersController;

  constructor() {
    this.router = Router();
    this.usersController = new UsersController();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/',
      ValidateLoginData.validateData,
      (req: Request, res: Response) =>
        this.usersController.login(req, res),
    );
  }

  public getRouter() {
    return this.router;
  }
}
