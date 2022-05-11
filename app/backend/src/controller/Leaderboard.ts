import { Request, Response } from 'express';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import LeaderBoardScore from '../helper/leaderBoardScore';

interface IResults {
  totalPoints: number,
  goalsBalance: number,
  goalsFavor: number,
}

// solução encontrada com a ajuda de Gabriel Peralta 

export default class Leaderboard {
  public static async homeTeamScore(_req: Request, res: Response) {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll();
    const results = teams.map((team) => {
      const board = matches
        .filter((match) => match.homeTeam === team.id && match.inProgress === false)
        .map((match) => ({ goalsFavor: match.homeTeamGoals, goalsOwn: match.awayTeamGoals }));
      return new LeaderBoardScore({ teamName: team.teamName, matches: board });
    });
    const sortedResults = Leaderboard.sortresults(results);
    return res.status(200).json(sortedResults);
  }

  public static async awayTeamScore(_req: Request, res: Response) {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll();
    const results = teams.map((team) => {
      const board = matches
        .filter((match) => match.awayTeam === team.id && match.inProgress === false)
        .map((match) => ({ goalsFavor: match.awayTeamGoals, goalsOwn: match.homeTeamGoals }));
      return new LeaderBoardScore({ teamName: team.teamName, matches: board });
    });
    const sortedResults = Leaderboard.sortresults(results);
    return res.status(200).json(sortedResults);
  }

  public static async generalTeamScore(_req: Request, res: Response) {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll();
    const results = teams.map((team) => {
      const homeMatches = matches
        .filter((match) => match.homeTeam === team.id && match.inProgress === false)
        .map((match) => ({ goalsFavor: match.homeTeamGoals, goalsOwn: match.awayTeamGoals }));
      const awayMatches = matches
        .filter((match) => match.awayTeam === team.id && match.inProgress === false)
        .map((match) => ({ goalsFavor: match.awayTeamGoals, goalsOwn: match.homeTeamGoals }));

      const allMatches = [...homeMatches, ...awayMatches];

      return new LeaderBoardScore({ teamName: team.teamName, matches: allMatches });
    });
    const sortedResults = Leaderboard.sortresults(results);
    return res.status(200).json(sortedResults);
  }

  public static sortresults(results: IResults[]) {
    results.sort((teamA, teamB) => {
      if (teamA.totalPoints < teamB.totalPoints) return 1;
      if (teamA.totalPoints > teamB.totalPoints) return -1;
      if (teamA.goalsBalance < teamB.goalsBalance) return 1;
      if (teamA.goalsBalance > teamB.goalsBalance) return -1;
      if (teamA.goalsFavor < teamB.goalsFavor) return 1;
      if (teamA.goalsFavor > teamB.goalsFavor) return -1;
      return 0;
    });
    return results;
  }
}
