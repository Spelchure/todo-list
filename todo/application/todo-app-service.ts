import {inject, injectable} from 'inversify';
import {Todo} from '../domain/todo';
import TYPES from '../../types';
import ITodoRepository from '../domain/todo-repository';
import {Timestamp} from '../../shared/timestamp';
import {Logging} from '../../shared/logging';

@injectable()
export default class TodoApplicationService {
  constructor(
    @inject(TYPES.ITodoRepository) private todoRepository: ITodoRepository,
    @inject(TYPES.Logging) private _logger: Logging
  ) {}

  public async listAll() {
    this._logger.logInfo('Listing all');
    return await this.todoRepository.getAll();
  }
  public async createNew(title: string, description: string) {
    const todoId = this.todoRepository.nextIdentity();
    const todo = new Todo(
      todoId,
      title,
      new Timestamp(),
      new Timestamp(),
      description
    );
    await this.todoRepository.save(todo);
  }
}
