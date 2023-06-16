import {inject, injectable} from 'inversify';
import {Todo, TodoUniqueID} from '@/todo/domain/todo';
import TYPES from '@/types';
import ITodoRepository from '@/todo/domain/todo-repository';
import {Timestamp} from '@/shared/timestamp';
import {Logging} from '@/shared/logging';

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
    return await this.todoRepository.save(todo);
  }
  public async deleteWithID(id: TodoUniqueID) {
    // if result instanceof EntityNotFoundError then log.warning( attempt ...
    return await this.todoRepository.delete(id);
  }
  public async update(todo: Partial<Todo>) {
    if (todo.id === null)
      throw Error('FATAL: Todo ID is null, validator not working properly!');
    return await this.todoRepository.update(todo);
  }

  public serializeTodo(todo: Todo) {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      creationDate: todo.creationDate.toString(),
      lastUpdated: todo.lastUpdated.toString(),
    };
  }
}
