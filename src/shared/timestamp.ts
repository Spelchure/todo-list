export class Timestamp {
  private _timestamp: string;

  constructor(timestamp?: string) {
    if (timestamp !== undefined) this._timestamp = timestamp;
    else this._timestamp = new Date().toISOString();
  }

  public toString() {
    return this._timestamp;
  }
}
