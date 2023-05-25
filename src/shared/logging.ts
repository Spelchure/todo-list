import {injectable} from 'inversify';
import winston, {format} from 'winston';

export type LogMessage = string;

export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

const alignColorsAndTime = winston.format.combine(
  winston.format.timestamp({
    format: 'DD.MM.YYYY HH:mm:ss',
  }),
  winston.format.printf(
    info => `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message}`
  )
);

@injectable()
export class Logging {
  private _prefix: string;
  private _logger: winston.Logger;

  constructor(prefix = '') {
    this._prefix = prefix;
    this._logger = this._initializeWinston();
  }

  public logInfo(msg: LogMessage) {
    this._log(msg, LogLevel.INFO);
  }
  public logWarn(msg: LogMessage) {
    this._log(msg, LogLevel.WARN);
  }
  public logError(msg: LogMessage) {
    this._log(msg, LogLevel.ERROR);
  }

  private _log(msg: LogMessage, level: LogLevel) {
    this._logger.log(level, `${this._prefix} ${msg}`);
  }

  private _initializeWinston() {
    const logger = winston.createLogger({
      format: format.combine(alignColorsAndTime, format.colorize({all: true})),
      transports: new winston.transports.Console(),
    });
    return logger;
  }
}
