import { User } from "../../entity/User";

export interface UserGateway {
  getUserByNickname(nickname: string): Promise<User | undefined>;
  createUser(user: User): Promise<any>;
}
