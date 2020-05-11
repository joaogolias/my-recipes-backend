import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { AuthenticatorUC } from "./base/Authenticator";
import { UserGateway } from "../gateway/User";
import { RefreshTokenGateway } from "../gateway/RefreshToken";
import { AuthenticationTokenGateway } from "../gateway/AuthenticationToken";
import { User } from "../../entity/User";
import { HashGateway } from "../gateway/Hash";
import { IdGateway } from "../gateway/Id";

export class SignupUC extends AuthenticatorUC<SignupUCInput, SingupUCOutput> {
  constructor(
    refreshTokenGateway: RefreshTokenGateway,
    authenticationTokenGateway: AuthenticationTokenGateway,
    private userGateway: UserGateway,
    private hashGateway: HashGateway,
    private idGateway: IdGateway
  ) {
    super(refreshTokenGateway, authenticationTokenGateway);
  }

  public async execute(input: SignupUCInput): Promise<SingupUCOutput> {
    await this.performValidation(input);

    const cryptedPassword = await this.hashGateway.hash(input.password!);

    const user = new User({
      id: this.idGateway.generateId(),
      name: input.name!,
      nickname: input.nickname!,
      email: input.email!,
      password: cryptedPassword,
    });

    await this.userGateway.createUser(user);

    console.log("user: ", user);
    await this.authenticate(user.id, user.nickname, input.device);

    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };
  }
}

export class SignupUCInput {
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
  @IsOptional()
  public device?: string;
}

export interface SingupUCOutput {
  accessToken: string;
  refreshToken: string;
}
