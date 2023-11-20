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
  goalsFavor: number; goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
};

type TeamsTypes = {
  main: 'homeTeam' | 'awayTeam';
  sub: 'homeTeam' | 'awayTeam';
};

type calcInfo = {
  name: string;
  baseStats: TeamStats;
  matches: IMatchWithTeamsNames[];
  teams: TeamsTypes
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

  private static whichTeam(typeTeam: 'home' | 'away') {
    const team: TeamsTypes = {
      main: typeTeam === 'home' ? 'homeTeam' : 'awayTeam',
      sub: typeTeam === 'home' ? 'awayTeam' : 'homeTeam',
    };
    return team;
  }

  private static calcStats(inf: calcInfo): Promise<TeamStats> {
    return new Promise((resolve) => {
      const s: TeamStats = { ...inf.baseStats };
      inf.matches.forEach((m) => {
        if (m[inf.teams.main].teamName === inf.name) {
          s.name = inf.name;
          s.totalGames += 1;
          s.totalVictories += m[`${inf.teams.main}Goals`] > m[`${inf.teams.sub}Goals`] ? 1 : 0;
          s.totalDraws += m[`${inf.teams.main}Goals`] === m[`${inf.teams.sub}Goals`] ? 1 : 0;
          s.totalLosses += m[`${inf.teams.main}Goals`] < m[`${inf.teams.sub}Goals`] ? 1 : 0;
          s.goalsFavor += m[`${inf.teams.main}Goals`];
          s.goalsOwn += m[`${inf.teams.sub}Goals`];
        }
      });
      s.totalPoints += (s.totalVictories * 3) + s.totalDraws;
      s.goalsBalance += s.goalsFavor - s.goalsOwn;
      s.efficiency += +((s.totalPoints / (s.totalGames * 3)) * 100).toFixed(2);
      resolve(s);
    });
  }

  private static sortTeamsByStatus(teamsStatus: TeamStats[]): TeamStats[] {
    teamsStatus.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
    return teamsStatus;
  }

  public async getTeamsStats(teamType: string): Promise<ServiceResponse<TeamStats[]>> {
    if (teamType !== 'home' && teamType !== 'away') {
      return { status: 'NOT_FOUND', data: { message: 'Route not found' } };
    }

    const matches = await this.matchesModel.findAll('false');

    const teamsNamesSet: Set<string> = new Set();
    matches.forEach((match) => { teamsNamesSet.add(match[`${teamType}Team`].teamName); });

    const teams = LeaderboardService.whichTeam(teamType);

    const statsPromises = Array.from(teamsNamesSet).map((name) =>
      LeaderboardService.calcStats({ name, baseStats: this.initialStats, matches, teams }));
    const consolidateStats = await Promise.all(statsPromises);

    const sortedStats = LeaderboardService.sortTeamsByStatus(consolidateStats);
    return { status: 'SUCCESSFUL', data: sortedStats };
  }
}
