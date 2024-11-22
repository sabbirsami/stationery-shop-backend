import { NextFunction, Request, Response } from 'express';

export interface CustomError extends Error {
  status?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  res.status(status).json({
    status: err?.status ? err.status : 'error',
    message,
  });
};

export default errorHandler;
