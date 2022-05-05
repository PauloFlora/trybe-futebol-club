import { Router } from 'express';
import Matches from '../controller/Matches';

const matchesRouter = Router();

matchesRouter.get('/', Matches.findAll);
// matchesRouter.get('/:id', Matches.findById);

export default matchesRouter;
