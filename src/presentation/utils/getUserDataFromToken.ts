import {
  AuthenticationTokenGateway,
  AuthenticationUserData,
} from "../../business/gateway/AuthenticationToken";
import { JwtAuthorizer } from "../../utils/jwt/JwtAuthorizer";

const getUserDataFromToken = (
  authenticationGateway: AuthenticationTokenGateway
) => (token: string): AuthenticationUserData => {
  return authenticationGateway.decode(token);
};

export default () => getUserDataFromToken(new JwtAuthorizer());
