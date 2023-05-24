import cors from 'cors';
import {InversifyExpressServer} from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import errorHandler from './error-handler';
import container from './container';

export default function createRestApplication() {
  const server = new InversifyExpressServer(container);

  server.setConfig(app => {
    app.use(cors());
    app.use(bodyParser.json());
  });
  server.setErrorConfig(app => {
    app.use(errorHandler);
  });

  return server.build();
}
