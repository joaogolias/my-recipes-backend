import { BaseDatabase } from "./base/BaseDatabase";
import { User } from "../entity/User";
import { UserGateway } from "../business/gateway/User";

export class UserDatabase extends BaseDatabase implements UserGateway {
  protected mainTableName: string = "user";

  private toUserEntity(dbModel: any): User {
    return new User({
      id: dbModel.id,
      nickname: dbModel.nickname,
      name: dbModel.nam,
      email: dbModel.email,
      password: dbModel.password,
    });
  }

  public async createUser(user: User): Promise<any> {
    await this.performQuery(async () => {
      await this.getConnection()
        .insert({
          id: user.id,
          nickname: user.nickname,
          name: user.name,
          email: user.email,
          password: user.password,
        })
        .into(this.mainTableName);
    });
  }

  public async getUserByNickname(nickname: string): Promise<User> {
    return this.performQuery(async () => {
      const result = await this.getConnection()
        .select("*")
        .from(this.mainTableName);
      return this.toUserEntity(result[0]);
    });
  }
}
