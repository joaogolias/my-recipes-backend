export interface AuthenticationTokenGateway {
  encode(payload: AuthenticationUserData, expiresIn: number): string;
  decode(token: string): AuthenticationUserData;
}

export interface AuthenticationUserData {
  id: string;
}
