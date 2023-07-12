import {injectable} from 'inversify';
import {UUIDGenerator} from '@/shared/unique-id';
import ITodoRepository from '@/todo/domain/todo-repository';
import {TodoModel} from './todo-orm-model';
import {Todo, TodoUniqueID} from '@/todo/domain/todo';
import {Timestamp} from '@/shared/timestamp';
import assert from 'assert';
import {EntityNotFoundError} from '@/shared/error/error';

@injectable()
export class SqlRepository implements ITodoRepository {
  public nextIdentity() {
    return UUIDGenerator.generateUUID() as TodoUniqueID;
  }

  public async getAll(): Promise<Todo[]> {
    const todos = await TodoModel.findAll();
    return todos.map(this._convertTodoModelToTodo);
  }

  public async getAllWithPagination(
    page: number,
    pageSize: number
  ): Promise<Todo[]> {
    // assert(page > 0, pageSize > 0 )
    const offset = page * pageSize;
    const limit = pageSize;

    const todos = await TodoModel.findAll({limit, offset});

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
    return this._entityNotFoundError(id);
  }

  public async update(todo: Partial<Todo>) {
    assert(todo.id !== null, 'Todo.id passed as null!');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id: string = todo.id!;
    const _todo = await this._findByUniqueID(id);

    if (_todo !== null) {
      const {title, description} = todo;
      const result = await _todo.update({title, description});
      return this._convertTodoModelToTodo(result);
    } else {
      return this._entityNotFoundError(id);
    }
  }

  private _entityNotFoundError(id: string) {
    return new EntityNotFoundError(`Cannot find todo with id: ${id}`);
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