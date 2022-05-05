import { Request, Response, NextFunction } from 'express';
import Teams from '../database/models/TeamsModel';

export default class MatchValidation {
  public static verifyTeamsNames(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams' });
    }
    return next();
  }

  public static async validateTeams(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;

    const teams = await Teams.findAll();

    const hasHomeTeam = teams.some((team) => team.id === Number(homeTeam));
    const hasAwayTeam = teams.some((team) => team.id === Number(awayTeam));

    if (!hasHomeTeam || !hasAwayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    return next();
  }
}
