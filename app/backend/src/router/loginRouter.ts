import { Router } from 'express';
import LoginController from '../controller/Login';
import LoginValidation from '../middlewares/LoginValidation';

const loginRouter = Router();

loginRouter.post('/', LoginValidation.email, LoginValidation.password, LoginController.login);

loginRouter.get('/validate', LoginController.checkToken);

export default loginRouter;
