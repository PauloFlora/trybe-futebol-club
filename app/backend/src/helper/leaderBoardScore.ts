// solução encontrada com a ajuda de Gabriel Peralta
interface ILeaderBoard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

interface ITeamStats {
  teamName: string;
  matches: IMatchGoals[];
}

interface IMatchGoals {
  goalsFavor: number;
  goalsOwn: number
}

export default class LeaderBoard implements ILeaderBoard {
  public name: string;

  public totalPoints: number;

  public totalGames: number;

  public totalVictories: number;

  public totalDraws: number;

  public totalLosses: number;

  public goalsFavor: number;

  public goalsOwn: number;

  public goalsBalance: number;

  public efficiency: number;

  constructor({ teamName, matches }: ITeamStats) {
    this.name = teamName;
    this.totalGames = matches.length;
    this.totalPoints = LeaderBoard.calculateTotalPoints(matches);
    this.totalVictories = LeaderBoard.calculateTotalVictories(matches);
    this.totalDraws = LeaderBoard.calculateTotalDraws(matches);
    this.totalLosses = LeaderBoard.calculateTotalLosses(matches);
    this.goalsFavor = LeaderBoard.calculateGoalsFavor(matches);
    this.goalsOwn = LeaderBoard.calculateGoalsOwn(matches);
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = Number(((this.totalPoints / (matches.length * 3)) * 100).toFixed(2));
  }

  private static calculateTotalPoints(matches: IMatchGoals[]) {
    return matches.reduce((totalPoints, match) => {
      if (match.goalsFavor > match.goalsOwn) return totalPoints + 3;
      if (match.goalsFavor === match.goalsOwn) return totalPoints + 1;
      return totalPoints;
    }, 0);
  }

  private static calculateTotalVictories(matches: IMatchGoals[]) {
    return matches.reduce((totalVictories, match) => {
      if (match.goalsFavor > match.goalsOwn) return totalVictories + 1;
      return totalVictories;
    }, 0);
  }

  private static calculateTotalDraws(matches: IMatchGoals[]) {
    return matches.reduce((totalDraws, match) => {
      if (match.goalsFavor === match.goalsOwn) return totalDraws + 1;
      return totalDraws;
    }, 0);
  }

  private static calculateTotalLosses(matches: IMatchGoals[]) {
    return matches.reduce((totalLosses, match) => {
      if (match.goalsFavor < match.goalsOwn) return totalLosses + 1;
      return totalLosses;
    }, 0);
  }

  private static calculateGoalsFavor(matches: IMatchGoals[]) {
    return matches.reduce((goalsFavor, match) => goalsFavor + match.goalsFavor, 0);
  }

  private static calculateGoalsOwn(matches: IMatchGoals[]) {
    return matches.reduce((goalsOwn, match) => goalsOwn + match.goalsOwn, 0);
  }
}
