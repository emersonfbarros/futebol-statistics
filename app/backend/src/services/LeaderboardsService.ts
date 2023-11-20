import { IMatchWithTeamsNames } from '../Interfaces/matches/IMatch';
import MatchesModel from '../models/MatchesModel';
import { ServiceResponse } from '../types/ServiceResponse';

type TeamStats = {
  name: string,
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
};

type dataToModel = {
  name: string;
  baseStats: TeamStats;
  matches: IMatchWithTeamsNames[];
};

export default class LeaderboardService {
  private matchesModel = new MatchesModel();
  private initialStats: TeamStats = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  };

  private static modelTeamStats({ name, baseStats, matches }: dataToModel): Promise<TeamStats> {
    return new Promise((resolve) => {
      const tStats: TeamStats = { ...baseStats };
      matches.forEach((match) => {
        if (match.homeTeam.teamName === name) {
          tStats.name = name;
          tStats.totalGames += 1;
          tStats.totalVictories += match.homeTeamGoals > match.awayTeamGoals ? 1 : 0;
          tStats.totalDraws += match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
          tStats.totalLosses += match.homeTeamGoals < match.awayTeamGoals ? 1 : 0;
          tStats.goalsFavor += match.homeTeamGoals;
          tStats.goalsOwn += match.awayTeamGoals;
        }
      });
      tStats.totalPoints += (tStats.totalVictories * 3) + tStats.totalDraws;
      tStats.goalsBalance += tStats.goalsFavor - tStats.goalsOwn;
      tStats.efficiency += +((tStats.totalPoints / (tStats.totalGames * 3)) * 100).toFixed(2);
      resolve(tStats);
    });
  }

  public async getHomeTeamsStats(): Promise<ServiceResponse<TeamStats[]>> {
    const matches = await this.matchesModel.findAll('false');
    const homeTeamsNamesSet: Set<string> = new Set();
    matches.forEach(({ homeTeam }) => { homeTeamsNamesSet.add(homeTeam.teamName); });
    const performancePromises = Array.from(homeTeamsNamesSet).map((name) =>
      LeaderboardService.modelTeamStats({ name, baseStats: this.initialStats, matches }));
    const consolidateStats = await Promise.all(performancePromises);
    consolidateStats.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
      if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
    return { status: 'SUCCESSFUL', data: consolidateStats };
  }
}
