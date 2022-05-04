import { Request, Response, NextFunction } from 'express';
import Users from '../database/models/UsersModel';

export default class UserValidation {
  public static async email(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const user = await Users.findOne({ where: { email } });

    if (!user || user.email !== email) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    return next();
  }

  public static password(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (password.length < 7) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    return next();
  }
}
