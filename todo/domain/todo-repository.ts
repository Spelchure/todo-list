import { Todo, TodoUniqueID } from "./todo";

// Hexagonal mimaride bu interface
// Domainin / business logic'in belirlediği
// porttur
export default interface ITodoRepository {
  nextIdentity: () => TodoUniqueID;
  getAll: () => Promise<Todo[]>;
  save: (todo: Todo) => Promise<void>;
}

// Portu implemente eden spesifik adapter
// @injectable()
// export class PostgreRepository implements ITodoRepository {
//   async getAll(): Promise<Todo[]> {
//     return Promise.resolve([]);
//   }
// }
