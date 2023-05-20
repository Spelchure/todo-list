import { injectable } from "inversify";

export type LogMessage = string;

export enum LogTypes {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

@injectable()
export class Logging {
  private _prefix: string;

  constructor(prefix = "") {
    this._prefix = prefix;
  }

  private _log(msg: LogMessage, type: LogTypes) {
    console.log(`[${this._prefix}] [${type}]: ${msg}`);
  }
  public logInfo(msg: LogMessage) {
    this._log(msg, LogTypes.INFO);
  }
  public logWarn(msg: LogMessage) {
    this._log(msg, LogTypes.WARN);
  }
  public logError(msg: LogMessage) {
    this._log(msg, LogTypes.ERROR);
  }
}
