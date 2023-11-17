import { NextFunction, Request, Response } from 'express';
import AuthManager from '../auth/AuthManager';
import Defaults from '../utils/Defaults';

export default class TokenValidation {
  static validate(req: Request, res: Response, next: NextFunction): Response | void {
    const message = 'Token not found';
    const unauth = Defaults.getHttpCode('UNAUTHORIZED');
    const { authorization } = req.headers;
    if (!authorization) return res.status(unauth).json({ message });
    if (authorization.slice(0, 6) !== 'Bearer') {
      return res.status(unauth).json({ message: 'Token must be a valid token' });
    }
    const token = authorization.slice(7);
    if (!token) return res.status(unauth).json({ message });
    try {
      res.locals.id = AuthManager.getInstance().verifyToken(token).id;
      next();
    } catch (error) {
      console.error(error);
      return res
        .status(unauth)
        .json({ message: 'Token must be a valid token' });
    }
  }
}
