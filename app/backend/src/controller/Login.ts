import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import Users from '../database/models/UsersModel';

const jwtConfig = {
  expiresIn: '7d',
};

// Solução encontrada com ajuda de Gabriel Peralta.
type Data = {
  data: string;
  iat: number;
  exp: number;
};

export default class LoginController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const secret = await readFile('jwt.evaluation.key', 'utf-8');

    const user = await Users.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(401).json({ message: 'Incorrect email or password' });

    const token = sign({ data: user.role }, secret, jwtConfig);

    const userInfo = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      token,
    };
    return res.status(200).json(userInfo);
  }

  public static async checkToken(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).json({ message: 'Token not provided' });

    const secret = await readFile('jwt.evaluation.key', 'utf-8');
    const user = verify(authorization, secret) as Data;
    return res.status(200).json(user.data);
  }
}
