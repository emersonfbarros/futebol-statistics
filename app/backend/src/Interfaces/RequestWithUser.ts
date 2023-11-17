import { Request } from 'express';
import { TokenPayload } from '../types/TokenPayload';

export default interface RequestWithUser extends Request {
  user: TokenPayload;
}
