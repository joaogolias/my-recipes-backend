import { BaseDatabase } from "./base/BaseDatabase";
import {
  RefreshTokenData,
  RefreshTokenGateway,
} from "../business/gateway/RefreshToken";

export class RefreshTokenDatabase extends BaseDatabase
  implements RefreshTokenGateway {
  protected mainTableName: string = "refresh_token";

  private toEntity(dbModel: any): RefreshTokenData {
    return {
      userId: dbModel.user_id,
      token: dbModel.token,
      isActive: this.tinyIntToBoolean(dbModel.is_active),
      device: dbModel.device,
      nickname: dbModel.nickname,
    };
  }
  public async createToken(data: RefreshTokenData): Promise<void> {
    await this.performQuery(async () => {
      console.log("here");
      await this.getConnection()
        .insert({
          token: data.token,
          device: data.device,
          nickname: data.nickname,
          user_id: data.userId,
          is_active: this.booleanToTinyInt(data.isActive),
        })
        .into(this.mainTableName);
      console.log("added");
    });
  }

  public async getTokenByNicknameAndDevice(
    nickname: string,
    device?: string
  ): Promise<RefreshTokenData[]> {
    return this.performQuery(async () => {
      let result = [];
      if (device) {
        result = await this.getConnection()
          .select("*")
          .from(this.mainTableName)
          .where({
            nickname,
            device,
          });
      } else {
        result = await this.getConnection()
          .select("*")
          .from(this.mainTableName)
          .where({
            nickname,
          });
      }
      return result.map(this.toEntity);
    });
  }
}
