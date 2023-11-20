import { IMatchWithTeamsNames } from '../Interfaces/matches/IMatch';
import MatchesModel from '../models/MatchesModel';
import { LeaderboardData } from '../types/LeaderboardData';
import { ServiceResponse } from '../types/ServiceResponse';

export default class LeaderboardService {
  private matchesModel = new MatchesModel();

  private static modelingTeamPerformance(
    initialTeamPerf: LeaderboardData,
    homeTeamsMatches: IMatchWithTeamsNames[],
  ): Promise<LeaderboardData> {
    return new Promise((resolve) => {
      const teamPerf: LeaderboardData = { ...initialTeamPerf };
      homeTeamsMatches.forEach((matche) => {
        if (matche.homeTeam.teamName === teamPerf.name) {
          teamPerf.totalGames += 1;
          teamPerf.totalVictories += matche.homeTeamGoals > matche.awayTeamGoals ? 1 : 0;
          teamPerf.totalDraws += matche.homeTeamGoals === matche.awayTeamGoals ? 1 : 0;
          teamPerf.totalLosses += matche.homeTeamGoals < matche.awayTeamGoals ? 1 : 0;
          teamPerf.goalsFavor += matche.homeTeamGoals;
          teamPerf.goalsOwn += matche.awayTeamGoals;
        }
      });
      teamPerf.totalPoints += (teamPerf.totalVictories * 3) + teamPerf.totalDraws;
      resolve(teamPerf);
    });
  }

  public async getHomeTeamsPerformance(): Promise<ServiceResponse<LeaderboardData[]>> {
    const homeTeamsMatches = await this.matchesModel.findAll('false');
    const homeTeamsNamesSet: Set<string> = new Set();
    homeTeamsMatches.forEach(({ homeTeam }) => { homeTeamsNamesSet.add(homeTeam.teamName); });
    const performancePromises = Array.from(homeTeamsNamesSet).map((teamName) => {
      const initialPerf: LeaderboardData = {
        name: teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
      };
      return LeaderboardService.modelingTeamPerformance(initialPerf, homeTeamsMatches);
    });
    const consolidatePerfs = await Promise.all(performancePromises);
    return { status: 'SUCCESSFUL', data: consolidatePerfs };
  }
}
