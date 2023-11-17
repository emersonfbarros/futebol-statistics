import { Request, Response } from 'express';
import UsersService from '../services/UsersService';
import { LoginData } from '../types/LoginData';
import Defaults from '../utils/Defaults';

export default class UsersController {
  private usersService = new UsersService();

  public async login({ body }: Request, res: Response) {
    const { status, data } = await this.usersService.login(body as unknown as LoginData);
    res.status(Defaults.getHttpCode(status)).json(data);
  }

  public async role(_req: Request, res: Response) {
    console.log(res.locals.id);
    const { status, data } = await this.usersService.role(Number(res.locals.id));
    res.status(Defaults.getHttpCode(status)).json(data);
  }
}
