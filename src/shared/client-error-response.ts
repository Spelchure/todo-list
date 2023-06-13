import {Response} from 'express';
import {ApplicationError} from './error/error';

export const clientErrorResponse = (res: Response, err: ApplicationError) => {
  return res.status(400).json({errors: err.message});
};