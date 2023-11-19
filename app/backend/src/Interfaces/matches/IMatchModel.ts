import IMatch from './IMatch';

export default interface IMatchModel {
  findAll(q: string): Promise<IMatch[]>;
}
