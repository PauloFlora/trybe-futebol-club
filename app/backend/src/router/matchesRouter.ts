import { Router } from 'express';
import MatchValidation from '../middlewares/mathesValidation';
import Matches from '../controller/Matches';

const matchesRouter = Router();

matchesRouter.get('/', Matches.findAll);
matchesRouter.post(
  '/',
  MatchValidation.verifyTeamsNames,
  MatchValidation.validateTeams,
  Matches.create,
);
matchesRouter.patch('/:id/finish', Matches.endMatch);

export default matchesRouter;
