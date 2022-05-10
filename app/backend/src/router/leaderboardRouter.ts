import { Router } from 'express';
import Leaderboard from '../controller/Leaderboard';

const teamsRouter = Router();

teamsRouter.get('/home', Leaderboard.homeTeamScore);
teamsRouter.get('/away', Leaderboard.awayTeamScore);
teamsRouter.get('/', Leaderboard.generalTeamScore);

export default teamsRouter;
