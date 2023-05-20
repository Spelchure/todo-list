import "reflect-metadata";
import cors from "cors";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import TodoApplicationService from "./todo/application/todo-app-service";
import ITodoRepository from "./todo/domain/todo-repository";
import { SqliteRepository } from "./todo/infrastructure/todo-sqlite-repository";
import * as bodyParser from "body-parser";
import TYPES from "./types";
import "./todo/application/todo-controller";
import { Logging } from "./shared/logging";

const container = new Container();

container
  .bind<TodoApplicationService>(TYPES.TodoApplicationService)
  .to(TodoApplicationService);

container
  .bind<ITodoRepository>(TYPES.ITodoRepository)
  .to(SqliteRepository)
  .inSingletonScope();

container.bind<Logging>(TYPES.Logging).to(Logging);

export default function createRestApplication() {
  const server = new InversifyExpressServer(container);
  // TODO: Add error handling middleware
  server.setConfig((app) => {
    app.use(cors());
    app.use(bodyParser.json());
  });

  return server.build();
}
