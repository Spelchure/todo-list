import 'reflect-metadata';
import container from './container';
import sequelize from './db';
import createRestApplication from './app';
import Configuration from './configuration';
import TYPES from './types';
import {Logging} from '@/shared/logging';

const startServer = async () => {
  const config = container.get<Configuration>(TYPES.Configuration);
  const logger = container.get<Logging>(TYPES.Logging);
  const port = config.get<number>('port');

  await sequelize.sync();

  const app = createRestApplication(config);

  app.listen(port);
  logger.logInfo(`App listening on port: ${port}`);
};

startServer();
