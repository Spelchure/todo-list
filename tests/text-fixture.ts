import 'reflect-metadata';
import createRestApplication from '@/app';
import container from '@/container';
import TYPES from '@/types';
import Configuration from '@/configuration';
import sequelize from '@/db';
import {Model, QueryOptionsWithModel} from 'sequelize';

class TextFixture {
  private readonly _app: Express.Application;

  constructor() {
    const config = container.get<Configuration>(TYPES.Configuration);
    this._app = createRestApplication(config);
  }

  public get app() {
    return this._app;
  }

  public async initialize() {
    //await sequelize.query('DROP DATABASE IF NOT EXISTS testdb');
    //usedb testdb
    await sequelize.sync();
  }

  public async executeQuery(
    query: string,
    params?: QueryOptionsWithModel<Model<any, any>>
  ) {
    if (params !== undefined) {
      return await sequelize.query(query, {...params});
    }
    return await sequelize.query(query);
  }
}

export const fixture = new TextFixture();
