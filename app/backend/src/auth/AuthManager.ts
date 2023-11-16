import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

export default class AuthManager {
  private static instance: AuthManager;
  private secret: string;

  private constructor() {
    this.secret = process.env.JWT_SECRET ?? 'jwt_secret';
  }

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  public createToken(payload: object): string {
    return jwt.sign(payload, this.secret);
  }

  public verifyToken(token: string): object {
    return jwt.verify(token, this.secret) as object;
  }

  public static comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
