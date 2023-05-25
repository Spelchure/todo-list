import {injectable} from 'inversify';
import {validationResult} from 'express-validator';
import {BaseMiddleware} from 'inversify-express-utils';
import {Request, Response, NextFunction} from 'express';

@injectable()
export class ValidationResultHandler extends BaseMiddleware {
  public handler(req: Request, res: Response, next: NextFunction) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(422).send({errors: validationErrors.array()});
    }

    next();
  }
}
