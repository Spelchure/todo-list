import 'reflect-metadata';
import container from './container';
import sequelize from './db';
import createRestApplication from './app';
import Configuration from './configuration';
import TYPES from './types';

const startServer = async () => {
  const config = container.get<Configuration>(TYPES.Configuration);
  const port = config.get<number>('port');
  await sequelize.sync();
  const app = createRestApplication();
  app.listen(port);
};

startServer();
