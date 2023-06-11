import {Todo, TodoUniqueID} from './todo';

export default interface ITodoRepository {
  nextIdentity: () => TodoUniqueID;
  getAll: () => Promise<Todo[]>;
  save: (todo: Todo) => Promise<void>;
  delete: (id: TodoUniqueID) => Promise<void>;
}
