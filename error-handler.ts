import {NextFunction, Request, Response} from 'express';

export default function errorHandler(
  err: unknown,
  _: Request,
  res: Response,
  __: NextFunction
) {
  console.error(`Error handled in middleware: ${err}`);
  res.status(500).send('Internal server error.');
}
