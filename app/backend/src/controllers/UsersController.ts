import { Request, Response } from 'express';
import UsersService from '../services/UsersService';
import { LoginData } from '../types/LoginData';
import Defaults from '../utils/Defaults';

export default class UsersController {
  private usersSerive = new UsersService();

  public async login({ body }: Request, res: Response) {
    const { status, data } = await this.usersSerive.login(body as unknown as LoginData);
    res.status(Defaults.getHttpCode(status)).json(data);
  }
}
