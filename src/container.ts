import {Container} from 'inversify';
import TodoApplicationService from './todo/application/todo-app-service';
import ITodoRepository from './todo/domain/todo-repository';
import {SqlRepository} from './todo/infrastructure/todo-sql-repository';
import TYPES from './types';
import Configuration from './configuration';
import {Logging} from './shared/logging';
import './todo/application/todo-controller';
import {ValidationResultHandler} from './shared/validation-result-handler';

const container = new Container();

container
  .bind<TodoApplicationService>(TYPES.TodoApplicationService)
  .to(TodoApplicationService);

container
  .bind<ITodoRepository>(TYPES.ITodoRepository)
  .to(SqlRepository)
  .inSingletonScope();

container
  .bind<Configuration>(TYPES.Configuration)
  .to(Configuration)
  .inSingletonScope();

container
  .bind<ValidationResultHandler>(ValidationResultHandler)
  .toSelf()
  .inSingletonScope();

container.bind<Logging>(TYPES.Logging).to(Logging);

export default container;
