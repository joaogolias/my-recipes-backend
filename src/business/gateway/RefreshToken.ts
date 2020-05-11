export interface RefreshTokenGateway {
  createToken(data: RefreshTokenData): Promise<void>;
  getTokenByNicknameAndDevice(
    nickname: string,
    device?: string
  ): Promise<RefreshTokenData[]>;
}

/**
 * I decided to create an interface to represent this data.
 * It does not represent an entity of our system, it is
 * simply data created due to our implementation.
 * */
export interface RefreshTokenData {
  id: string;
  token: string;
  isActive: boolean;
  device?: string;
  nickname: string;
}
