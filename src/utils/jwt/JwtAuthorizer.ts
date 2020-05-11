import * as jwt from "jsonwebtoken";
import {
  AuthenticationTokenGateway,
  AuthenticationUserData,
} from "../../business/gateway/AuthenticationToken";

export class JwtAuthorizer implements AuthenticationTokenGateway {
  private static DEFAULT_EXPIRES_IN = 10 * 3600;

  public encode(
    payload: AuthenticationUserData,
    expiresIn: number = JwtAuthorizer.DEFAULT_EXPIRES_IN
  ): string {
    console.log("oi");
    return jwt.sign(payload, process.env.JWT_KEY!, {
      expiresIn,
    });
  }
  public decode(token: string): AuthenticationUserData {
    const data = jwt.verify(token, process.env.JWT_KEY!) as any;
    return {
      id: data.id,
    };
  }
}
