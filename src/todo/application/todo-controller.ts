import {Request, Response, NextFunction} from 'express';
import TodoApplicationService from './todo-app-service';
import {
  interfaces,
  request,
  response,
  next,
  controller,
  httpGet,
  httpPost,
} from 'inversify-express-utils';
import TYPES from '@/types';
import {inject} from 'inversify';
import {createTodoValidator} from './todo-validators';
import {ValidationResultHandler} from '@/shared/validation-result-handler';

interface CreateTodoRequest {
  title: string;
  description: string;
}

@controller('/todo')
export class TodoController implements interfaces.Controller {
  constructor(
    @inject(TYPES.TodoApplicationService)
    private todoService: TodoApplicationService
  ) {}

  @httpGet('/')
  private async index(
    @request() _: Request,
    @response() res: Response,
    @next() __: NextFunction
  ) {
    return res.json(await this.todoService.listAll());
  }

  @httpPost('/', ...createTodoValidator, ValidationResultHandler)
  private async createNew(
    @request() req: Request,
    @response() _: Response,
    @next() __: NextFunction
  ) {
    const {title, description}: CreateTodoRequest = req.body;
    await this.todoService.createNew(title, description);
  }
}
