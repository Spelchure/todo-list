import {Container} from 'inversify';
import TodoApplicationService from './todo/application/todo-app-service';
import ITodoRepository from './todo/domain/todo-repository';
import {SqliteRepository} from './todo/infrastructure/todo-sqlite-repository';
import TYPES from './types';
import Configuration from './configuration';
import {Logging} from './shared/logging';
import './todo/application/todo-controller';

const container = new Container();

container
  .bind<TodoApplicationService>(TYPES.TodoApplicationService)
  .to(TodoApplicationService);

container
  .bind<ITodoRepository>(TYPES.ITodoRepository)
  .to(SqliteRepository)
  .inSingletonScope();

container
  .bind<Configuration>(TYPES.Configuration)
  .to(Configuration)
  .inSingletonScope();

container.bind<Logging>(TYPES.Logging).to(Logging);

export default container;
