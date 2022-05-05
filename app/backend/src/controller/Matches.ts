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
    console.log(`Creating match with homeTeam: ${homeTeam} and awayTeam: ${awayTeam} `);

    const created = await Matches.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    console.log('Result of match creation:', '_____________________________', created);

    return res.status(201).json({ message: 'Match created' });
  }

  public static async endMatch(req: Request, res: Response) {
    const { id } = req.params;
    console.log(`Ending Match with id: ${id}`);

    if (!id) {
      return res.status(400).json({ message: 'vai toma no cu' });
    }

    const endMatch = await Matches.update({ inProgress: false }, { where: { id } });

    console.log('Result of ending match:', '_____________________________', endMatch);

    return res.status(200).json({ message: 'Match ended' });
  }
}
