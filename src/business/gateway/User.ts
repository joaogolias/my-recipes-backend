import { User } from "../../entity/User";

export interface UserGateway {
  getUserByNickname(nickname: string): Promise<User>;
  createUser(user: User): Promise<any>;
}
