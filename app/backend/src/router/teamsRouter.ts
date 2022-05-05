import { Router } from 'express';
import Teams from '../controller/Teams';

const teamsRouter = Router();

teamsRouter.get('/', Teams.findAll);
teamsRouter.get('/:id', Teams.findById);

export default teamsRouter;
