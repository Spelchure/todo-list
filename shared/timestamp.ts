/**
 * Iso8601 standart date time
 *  Value object
 *  should be immutable
 */
export class Timestamp {
  private _timestamp: string;

  constructor(timestamp?: string) {
    //assert(timestamp is valid)
    if (timestamp !== undefined) this._timestamp = timestamp;
    else this._timestamp = new Date().toISOString();
  }

  public toString() {
    return this._timestamp;
  }
}
