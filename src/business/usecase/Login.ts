import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { AuthenticatorUC } from "./base/Authenticator";
import { UserGateway } from "../gateway/User";
import { RefreshTokenGateway } from "../gateway/RefreshToken";
import { AuthenticationTokenGateway } from "../gateway/AuthenticationToken";
import { User } from "../../entity/User";
import { HashGateway } from "../gateway/Hash";
import { IdGateway } from "../gateway/Id";
import { NotFoundError } from "../../utils/error/NotFoundError";
import { InvalidInputError } from "../../utils/error/InvalidInputError";

export class LoginUC extends AuthenticatorUC<LoginUCInput, LoginUCOutput> {
  constructor(
    refreshTokenGateway: RefreshTokenGateway,
    authenticationTokenGateway: AuthenticationTokenGateway,
    private userGateway: UserGateway,
    private hashGateway: HashGateway,
    private idGateway: IdGateway
  ) {
    super(refreshTokenGateway, authenticationTokenGateway);
  }

  public async execute(input: LoginUCInput): Promise<LoginUCOutput> {
    await this.performValidation(input);

    const user = await this.userGateway.getUserByNickname(input.nickname!);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const comparedPassword = await this.hashGateway.compare(
      input.password!,
      user.password
    );
    if (!comparedPassword) {
      throw new InvalidInputError("Invalid password");
    }

    await this.authenticate(user.id, user.nickname, input.device);

    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };
  }
}

export class LoginUCInput {
  @IsString()
  @IsNotEmpty()
  public nickname?: string;

  @IsString()
  @IsNotEmpty()
  public password?: string;

  @IsString()
  @IsOptional()
  public device?: string;
}

export interface LoginUCOutput {
  accessToken: string;
  refreshToken: string;
}
