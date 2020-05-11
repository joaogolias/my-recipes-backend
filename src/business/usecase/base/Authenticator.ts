import { BaseUC } from "./Base";
import { RefreshTokenGateway } from "../../gateway/RefreshToken";
import { InvalidInputError } from "../../../utils/error/InvalidInputError";
import { UnauthorizedError } from "../../../utils/error/UnauthorizedError";
import { BusinessErrorMessage } from "../error/BusinessErrorMessage";
import { AuthenticationTokenGateway } from "../../gateway/AuthenticationToken";

export abstract class AuthenticatorUC<Input, Output> extends BaseUC<
  Input,
  Output
> {
  protected refreshToken: string = "";
  protected accessToken: string = "";

  constructor(
    private refreshTokenGateway: RefreshTokenGateway,
    private authenticationTokenGateway: AuthenticationTokenGateway
  ) {
    super();
  }

  private static REFRESH_TOKEN_EXPIRES = Number(
    process.env.REFRESH_TOKEN_EXPIRES
  );
  private static ACCESS_TOKEN_EXPIRES = Number(
    process.env.ACCESS_TOKEN_EXPIRES
  );
  protected async generateRefreshToken(
    id: string,
    nickname: string,
    device?: string
  ): Promise<void> {
    const refreshToken = await this.refreshTokenGateway.getTokenByNicknameAndDevice(
      nickname,
      device
    );

    if (refreshToken.length > 1 && !device) {
      throw new InvalidInputError(
        `${BusinessErrorMessage.MISSING_INPUT}. Device is missing`
      );
    }

    if (!refreshToken[0]) {
      const newRefreshToken = this.authenticationTokenGateway.encode(
        { id },
        AuthenticatorUC.REFRESH_TOKEN_EXPIRES
      );
      await this.refreshTokenGateway.createToken({
        id,
        token: newRefreshToken,
        isActive: true,
        device,
        nickname,
      });
      this.refreshToken = newRefreshToken;
    } else {
      if (refreshToken[0].isActive) {
        this.refreshToken = refreshToken[0].token;
      } else {
        throw new UnauthorizedError("Inactive Refresh Token");
      }
    }
  }

  protected generateAccessToken(id: string, nickname: string): void {
    this.accessToken = this.authenticationTokenGateway.encode(
      {
        id,
        nickname,
      },
      AuthenticatorUC.ACCESS_TOKEN_EXPIRES
    );
  }
  protected async authenticate(
    id: string,
    nickname: string,
    device?: string
  ): Promise<void> {
    await this.generateRefreshToken(id, nickname, device);
    this.generateAccessToken(id, nickname);
  }
}
