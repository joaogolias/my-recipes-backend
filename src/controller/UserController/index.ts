import { getRepository } from "typeorm";
import { User } from "../../entity/User";

export class UserController {
  private userRepository = getRepository(User);

  public async all() {
    return (await this.userRepository.find()) || [];
  }

  async one(id: string) {
    return this.userRepository.findOne(id);
  }

  async save(input: any) {
    return this.userRepository.save(input);
  }

  async remove(id: string) {
    let userToRemove = await this.userRepository.findOne(id);

    if (userToRemove) {
      await this.userRepository.remove(userToRemove);
    }
  }
}
