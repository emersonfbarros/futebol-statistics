import IUser from './IUser';

export default interface IUserModel {
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: number): Promise<IUser | null>;
}
