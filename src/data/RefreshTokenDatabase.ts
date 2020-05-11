import { BaseDatabase } from "./base/BaseDatabase";
import { RefreshTokenData, RefreshTokenGateway } from "../business/gateway/RefreshToken";

export class RefreshTokenDatabase extends BaseDatabase implements RefreshTokenGateway {
	protected mainTableName: string = "refresh_token"

	private toEntity(dbModel: any): RefreshTokenData {
		return {
			token: dbModel.token,
			isActive: this.tinyIntToBoolean(dbModel.is_active),
			device: dbModel.device,
			nickname: dbModel.nickname
		}
	}
	public async createToken(data: RefreshTokenData): Promise<void> {
		this.performQuery(async () => {
			await this.getConnection().insert({
				...data,
				is_active: this.booleanToTinyInt(data.isActive)
			}).into(this.mainTableName)
		})
	}

	public async getTokenByNicknameAndDevice(nickname: string, device?: string):
		Promise<RefreshTokenData[]> {
		return this.performQuery(async () => {
			const result = await this.getConnection()
				.select("*")
				.from(this.mainTableName)
				.where({
					nickname,
					device
				})
			return result.map(this.toEntity)
		})
	}
}