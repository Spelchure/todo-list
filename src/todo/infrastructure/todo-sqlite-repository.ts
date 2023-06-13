import {injectable} from 'inversify';
import {UUIDGenerator} from '@/shared/unique-id';
import ITodoRepository from '@/todo/domain/todo-repository';
import {TodoModel} from './todo-orm-model';
import {Todo, TodoUniqueID} from '@/todo/domain/todo';
import {Timestamp} from '@/shared/timestamp';
import assert from 'assert';
import {EntityNotFoundError} from '@/shared/error/error';

@injectable()
export class SqliteRepository implements ITodoRepository {
  public nextIdentity() {
    return UUIDGenerator.generateUUID() as TodoUniqueID;
  }

  public async getAll(): Promise<Todo[]> {
    const todos = await TodoModel.findAll();
    return todos.map(this._convertTodoModelToTodo);
  }

  public async save(todo: Todo) {
    const createdTodo = await TodoModel.create({
      uniqueID: todo.id,
      title: todo.title,
      description: todo.description,
      creationDate: todo.creationDate.toString(),
      lastUpdatedAt: todo.lastUpdated.toString(),
    });
    return this._convertTodoModelToTodo(createdTodo);
  }

  public async delete(id: TodoUniqueID) {
    const todo = await this._findByUniqueID(id);
    if (todo !== null) {
      await todo.destroy();
      return this._convertTodoModelToTodo(todo);
    }
    return new EntityNotFoundError(`Cannot find todo with id: ${id}`);
  }

  public async update(todo: Partial<Todo>) {
    assert(todo.id !== null, 'Todo.id passed as null!');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const _todo = await this._findByUniqueID(todo.id!);
    // TODO: Should error typed domain error
    if (_todo !== null) {
      const {title, description} = todo;
      await _todo.update({title, description});
    }
  }

  private async _findByUniqueID(id: TodoUniqueID) {
    return TodoModel.findOne({where: {uniqueID: id}});
  }

  private _convertTodoModelToTodo(todoModel: TodoModel) {
    return new Todo(
      todoModel.uniqueID.toString(),
      todoModel.title,
      new Timestamp(todoModel.creationDate),
      new Timestamp(todoModel.lastUpdatedAt),
      todoModel.description.toString()
    );
  }
}
