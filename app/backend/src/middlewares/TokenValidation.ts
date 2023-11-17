import { NextFunction, Response } from 'express';
import AuthManager from '../auth/AuthManager';
import RequestWithUser from '../Interfaces/RequestWithUser';
import Defaults from '../utils/Defaults';

export default class TokenValidation {
  static validate(req: RequestWithUser, res: Response, next: NextFunction): Response | void {
    const message = 'Token not found';
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(Defaults.getHttpCode('UNAUTHORIZED')).json({ message });
    }
    const token = authorization.slice(7);
    if (!token) {
      return res.status(Defaults.getHttpCode('UNAUTHORIZED')).json({ message });
    }
    try {
      req.user = AuthManager.getInstance().verifyToken(token);
      next();
    } catch (error) {
      console.error(error);
      return res
        .status(Defaults.getHttpCode('UNAUTHORIZED'))
        .json({ message: 'Token must be a valid token' });
    }
  }
}
