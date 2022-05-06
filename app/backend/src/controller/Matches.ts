import { Request, Response } from 'express';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export default class MatchesController {
  public static async findAll(req: Request, res: Response) {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return res.status(200).json(matches);
  }

  public static async create(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    const created = await Matches.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return res.status(201).json(created);
  }

  public static async endMatch(req: Request, res: Response) {
    const { id } = req.params;

    await Matches.update({ inProgress: false }, { where: { id } });

    return res.status(200).json({ message: 'Match ended' });
  }

  public static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    console.log('editando match');
    console.log(homeTeamGoals, awayTeamGoals, id);

    const editedMatch = await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return res.status(200).json(editedMatch);
  }
}
