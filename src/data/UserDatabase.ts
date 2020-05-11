import { BaseDatabase } from "./base/BaseDatabase";
import { User } from "../entity/User";

export class UserDatabase extends BaseDatabase {
  protected mainTableName: string = "user";

  public async createUser(user: User): Promise<void> {
    this.getConnection;
  }
}
