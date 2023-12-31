import SequelizeMatches from '../database/models/MatchesModel';
import SequelizeTeams from '../database/models/TeamsModel';
import IMatch, { IMatchWithTeamsNames } from '../Interfaces/matches/IMatch';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import { NewMatchPayload } from '../types/NewMatchPayload';
import { UpdateScoreboardPayload } from '../types/UpdateScoreboardPayload';

export default class MatchesModel implements IMatchModel {
  private model = SequelizeMatches;

  async findAll(q: string | undefined): Promise<IMatchWithTeamsNames[]> {
    const matches = await this.model.findAll({
      where: (q === 'true' || q === 'false') ? { inProgress: q === 'true' } : undefined,
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    }) as unknown as IMatchWithTeamsNames[];
    return matches;
  }

  async endsMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updatesScoreboard(
    { id, homeTeamGoals, awayTeamGoals }: UpdateScoreboardPayload,
  ): Promise<void> {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  async createsMatch(payload: NewMatchPayload): Promise<IMatch> {
    const createdMatch = await this.model.create({ ...payload, inProgress: true });
    return createdMatch;
  }
}
