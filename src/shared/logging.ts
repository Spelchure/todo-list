import {injectable} from 'inversify';
import winston, {format} from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export type LogMessage = string;

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

@injectable()
export class Logging {
  private _prefix: string;
  private _logger: winston.Logger;
  private static _appName = 'TodoList';

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
  public logDebug(msg: LogMessage) {
    if (process.env.NODE_ENV !== 'production') {
      this._log(msg, LogLevel.DEBUG);
    }
  }

  private _log(msg: LogMessage, level: LogLevel) {
    this._logger.log(level, `${this._prefix} ${msg}`);
  }

  private _initializeWinston() {
    const logger = winston.createLogger({
      transports: Logging._getTransports(),
    });
    return logger;
  }

  private static _getTransports() {
    const transports: Array<any> = [
      new winston.transports.Console({
        format: this._getFormatForConsole(),
      }),
    ];

    if (process.env.NODE_ENV !== 'production') {
      transports.push(this._getFileTransport());
    }

    return transports;
  }

  private static _getFormatForConsole() {
    return format.combine(
      format.timestamp(),
      format.printf(
        info =>
          `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message}`
      ),
      format.colorize({all: true})
    );
  }

  private static _getFileTransport() {
    return new DailyRotateFile({
      filename: `${Logging._appName}-%DATE%.log`,
      zippedArchive: true, // Compress gzip
      maxSize: '10m', // Rotate after 10MB
      maxFiles: '14d', // Only keep last 14 days
      format: format.combine(
        format.timestamp(),
        format(info => {
          info.app = this._appName;
          return info;
        })(),
        format.json()
      ),
    });
  }
}