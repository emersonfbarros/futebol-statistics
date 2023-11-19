import IMatch from './IMatch';
import { UpdateScoreboardPayload } from '../../types/UpdateScoreboardPayload';
import { NewMatchPayload } from '../../types/NewMatchPayload';

export default interface IMatchModel {
  findAll(q: string): Promise<IMatch[]>;
  endsMatch(id: number): Promise<void>;
  updatesScoreboard(payload: UpdateScoreboardPayload): Promise<void>;
  createsMatch(payload: NewMatchPayload): Promise<IMatch>;
}
