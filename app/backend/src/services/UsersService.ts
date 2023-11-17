import AuthManager from '../auth/AuthManager';
import IUser from '../Interfaces/user/IUser';
import UsersModel from '../models/UserModel';
import { LoginData } from '../types/LoginData';
import { ServiceResponse } from '../types/ServiceResponse';

export default class UsersService {
  private usersModel = new UsersModel();

  public async login({ email, password }: LoginData): Promise<
  ServiceResponse<{ token: string }>
  > {
    const user = await this.usersModel.findByEmail(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const passwordMatch = AuthManager.comparePassword(password, user.password);
    if (!passwordMatch) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = AuthManager.getInstance().createToken({ id: user.id });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async role(id: number): Promise<ServiceResponse<{ role: string }>> {
    const user = await this.usersModel.findById(id) as IUser;
    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
