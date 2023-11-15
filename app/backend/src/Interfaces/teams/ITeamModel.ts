import ITeam from './ITeam';

export default interface ITeamModel {
  findAll(): Promise<ITeam[]>;
  findById(id: number): Promise<ITeam | null>;
}
