import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../../entity/User";
import { validateOrReject } from "class-validator";
import { SaveUserInput } from "./input/save";
import { v4 } from "uuid";
import { GetUserByIdInput } from "./input/getUserById";
import { DeleteUserInput } from "./input/deleteUser";

export class UserController {
  private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    const users = (await this.userRepository.find()) || [];
    return {
      users,
    };
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;

    const input = new GetUserByIdInput();
    input.id = id;

    validateOrReject(input);

    return this.userRepository.findOne(input.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const input = new SaveUserInput();

    const id = v4();

    input.name = request.body.name;
    input.nickname = request.body.nickname;
    input.email = request.body.email;

    validateOrReject(input);

    return this.userRepository.save({
      id,
      name: input.name,
      nickname: input.nickname,
      email: input.email,
    });
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const input = new DeleteUserInput();

    input.id = request.params.id;

    validateOrReject(input);

    let userToRemove = await this.userRepository.findOne(request.params.id);

    if (userToRemove) {
      await this.userRepository.remove(userToRemove);
    }
  }
}
