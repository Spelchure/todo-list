export class ApplicationError {
  private _msg: string;

  constructor(msg: string) {
    this._msg = msg;
  }

  public get message() {
    return this._msg;
  }
}

export class EntityNotFoundError extends ApplicationError {}
