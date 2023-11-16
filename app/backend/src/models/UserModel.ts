import SequelizeUsers from '../database/models/UsersModel';
import IUser from '../Interfaces/user/IUser';
import IUserModel from '../Interfaces/user/IUserModel';

export default class UsersModel implements IUserModel {
  private model = SequelizeUsers;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}
