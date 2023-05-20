import {injectable} from 'inversify';
import {UUIDGenerator} from '../../shared/unique-id';
import ITodoRepository from '../domain/todo-repository';
import {TodoModel} from './todo-orm-model';
import {Todo, TodoUniqueID} from '../domain/todo';
import {Timestamp} from '../../shared/timestamp';

@injectable()
export class SqliteRepository implements ITodoRepository {
  public nextIdentity() {
    return UUIDGenerator.generateUUID() as TodoUniqueID;
  }

  public async getAll(): Promise<Todo[]> {
    const todos = await TodoModel.findAll();
    return todos.map(this.convertTodoModelToTodo);
  }

  public async save(todo: Todo) {
    await TodoModel.create({
      uniqueID: todo.id,
      title: todo.title,
      description: todo.description,
      creationDate: todo.creationDate.toString(),
      lastUpdatedAt: todo.lastUpdated.toString(),
    });
  }

  // TODO: use data mapper pattern
  private convertTodoModelToTodo(todoModel: TodoModel) {
    return new Todo(
      todoModel.uniqueID.toString(),
      todoModel.title,
      new Timestamp(todoModel.creationDate),
      new Timestamp(todoModel.lastUpdatedAt),
      todoModel.description.toString()
    );
  }
}
