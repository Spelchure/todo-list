import 'reflect-metadata';
import createRestApplication from '@/app';
import container from '@/container';
import TYPES from '@/types';
import Configuration from '@/configuration';
import sequelize from '@/db';
import {Model, QueryOptions} from 'sequelize';

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
    await sequelize.sync();
    await this.executeQuery('TRUNCATE TABLE public."TodoModels"');
  }

  public async executeQuery(query: string, params?: QueryOptions) {
    if (params !== undefined) {
      return await sequelize.query(query, {...params});
    }
    return await sequelize.query(query);
  }
}

export const fixture = new TextFixture();
