import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import errorHandler, { CustomError } from './app/utils/errorHandler';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Bye World!');
});

// HANDLE UNKNOWN ERROR ---

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error: CustomError = new Error(
    `Can't find ${req.originalUrl} route on the server`
  );
  error.status = 404;
  next(error);
});

app.use(errorHandler);

export default app;
