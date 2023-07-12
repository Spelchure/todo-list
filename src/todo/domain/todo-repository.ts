import {Todo, TodoUniqueID} from './todo';
import {EntityNotFoundError} from '@/shared/error/error';

export default interface ITodoRepository {
  nextIdentity: () => TodoUniqueID;
  getAll: () => Promise<Todo[]>;
  getAllWithPagination: (page: number, pageSize: number) => Promise<Todo[]>;
  save: (todo: Todo) => Promise<Todo>;
  delete: (id: TodoUniqueID) => Promise<Todo | EntityNotFoundError>;
  update: (todo: Partial<Todo>) => Promise<Todo | EntityNotFoundError>;
}
