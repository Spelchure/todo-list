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
  httpDelete,
} from 'inversify-express-utils';
import TYPES from '@/types';
import {inject} from 'inversify';
import {createTodoValidator, deleteTodoValidator} from './todo-validators';
import {ValidationResultHandler} from '@/shared/validation-result-handler';
import {TodoUniqueID} from '../domain/todo';

interface CreateTodoRequest {
  title: string;
  description: string;
}

interface DeleteTodoRequest {
  id: TodoUniqueID;
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

  @httpDelete('/', ...deleteTodoValidator, ValidationResultHandler)
  private async delete(
    @request() req: Request,
    @response() _: Response,
    @next() __: NextFunction
  ) {
    const {id}: DeleteTodoRequest = req.body;
    await this.todoService.deleteWithID(id);
  }
}
