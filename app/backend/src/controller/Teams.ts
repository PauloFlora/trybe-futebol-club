import { Request, Response } from 'express';
import Teams from '../database/models/TeamsModel';

export default class TeamsController {
  public static async findAll(req: Request, res: Response) {
    const teams = await Teams.findAll();
    res.status(201).json(teams);
  }

  public static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await Teams.findByPk(id);
    res.status(201).json(team);
  }
}
