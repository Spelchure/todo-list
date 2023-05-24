import assert from 'node:assert/strict';
import {injectable} from 'inversify';

export type ConfigurationKey = string;
// eslint-disable-next-line
export type ConfigurationItem = any;

@injectable()
export default class Configuration {
  private readonly _configParams: Record<ConfigurationKey, ConfigurationItem>;

  constructor() {
    assert(
      process.env.PORT !== undefined,
      'Please specify PORT in environment'
    );
    this._configParams = {
      port: process.env.PORT,
    };
  }

  public get<T>(key: ConfigurationKey): T {
    assert(key in this._configParams);
    return this._configParams[key] as T;
  }
}
