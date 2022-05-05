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
    console.log(matches);
    res.status(200).json(matches);
  }
}
