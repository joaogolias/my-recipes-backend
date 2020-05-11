import { IsString, IsNotEmpty } from "class-validator";
import { AuthenticatorUC } from "./base/Authenticator";
import { UserGateway } from "../gateway/User";
import { RefreshTokenGateway } from "../gateway/RefreshToken";
import { AuthenticationTokenGateway } from "../gateway/AuthenticationToken";
import { User } from "../../entity/User";
import { HashGateway } from "../gateway/Hash";

export class SignupUC extends AuthenticatorUC<SignupUCInput, SingupUCOutput> {
  constructor(
    refreshTokenGateway: RefreshTokenGateway,
    authenticationTokenGateway: AuthenticationTokenGateway,
    private userGateway: UserGateway,
    private hashGateway: HashGateway
  ) {
    super(refreshTokenGateway, authenticationTokenGateway);
  }

  public async execute(input: SignupUCInput): Promise<SingupUCOutput> {
    const cryptedPassword = await this.hashGateway.hash(input.password!);

    const user = new User({
      id: input.id!,
      name: input.name!,
      nickname: input.nickname!,
      email: input.email!,
      password: cryptedPassword,
    });

    await this.userGateway.createUser(user);

    await this.authenticate(user.id, user.name, input.device);

    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };
  }
}

export class SignupUCInput {
  @IsString()
  @IsNotEmpty()
  public id?: string;

  @IsString()
  @IsNotEmpty()
  public name?: string;

  @IsString()
  @IsNotEmpty()
  public nickname?: string;

  @IsString()
  @IsNotEmpty()
  public email?: string;

  @IsString()
  @IsNotEmpty()
  public password?: string;

  @IsString()
  public device?: string;
}

export interface SingupUCOutput {
  accessToken: string;
  refreshToken: string;
}
