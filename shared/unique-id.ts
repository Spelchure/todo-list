import { v4 as uuidv4 } from "uuid";

export type UniqueID = string;

export class UUIDGenerator {
  public static generateUUID() {
    return uuidv4();
  }
}
