import { NextFunction, Request, Response } from 'express';
import { LoginData } from '../types/LoginData';
import Defaults from '../utils/Defaults';
import ValidationUtils from '../utils/ValidationUtils';

export default class ValidateLoginData {
  static validateData(
    { body }: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    const { error } = ValidationUtils.validateLoginSchema(
      body as unknown as LoginData,
    );
    if (error) {
      const { message } = error.details[0];
      return res
        .status(Defaults.getHttpCode(
          message === 'Invalid email or password' ? 'UNAUTHORIZED' : 'BAD_REQ',
        ))
        .json({ message });
    }
    return next();
  }
}
