import {injectable} from 'inversify';
import winston, {format} from 'winston';

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
  private static _appName = 'TodoList';
  private static _logFilePath = './logs.json';
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
      transports: Logging._getTransports(Logging._logFilePath),
    });
    return logger;
  }

  private static _getFormat() {
    return this._getFormatterByEnvironment();
  }

  private static _getFormatterByEnvironment() {
    let formats = [format.timestamp()];

    if (process.env.NODE_ENV !== 'production') {
      formats = [...formats];
      formats = [...formats, format.json()];
    } else {
      formats = [...formats];
    }
    return winston.format.combine(...formats);
  }

  private static _getTransports(logFilePath: string) {
    const transports: Array<any> = [
      new winston.transports.Console({
        format: this._getFormatForConsole(),
      }),
    ];

    if (process.env.NODE_ENV !== 'production') {
      transports.push(
        new winston.transports.File({
          filename: logFilePath,
          format: this._getFormatForFile(),
        })
      );
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
      format.colorize({all: true}) // FIX: set specific colors.
    );
  }

  private static _getFormatForFile() {
    return format.combine(
      format.timestamp(),
      format(info => {
        info.app = this._appName;
        return info;
      })(),
      format.json()
    );
  }
}
