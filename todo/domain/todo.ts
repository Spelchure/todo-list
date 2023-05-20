import { Timestamp } from "../../shared/timestamp";
import assert from "assert";

/**
 * UniqueID value objesi
 */
export type TodoUniqueID = string;

/*
 * Idsi vardır bir entitydir uniqdir.
 *
 */
export class Todo {
  public title: string;
  public creationDate: Timestamp;
  public description: string;
  public id: TodoUniqueID;
  private _lastUpdated: Timestamp;

  constructor(
    id: TodoUniqueID,
    title: string,
    creationDate: Timestamp,
    lastUpdated: Timestamp,
    description: string
  ) {
    // Design by contract
    // defensive programming
    assert(title.length > 0, "Title is required");
    assert(description.length > 0, "Description is required");

    this.id = id;
    this.title = title;
    this.creationDate = creationDate;
    this._lastUpdated = lastUpdated;
    this.description = description;
  }

  public get lastUpdated() {
    return this._lastUpdated;
  }
}
