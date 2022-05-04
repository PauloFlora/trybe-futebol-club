import * as express from 'express';
import loginRouter from './router/loginRouter';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.routes();
    // ...
  }

  private routes():void {
    this.app.use('/login', loginRouter);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Server is runing on ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
