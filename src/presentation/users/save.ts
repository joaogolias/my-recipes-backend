import { IsString, IsNotEmpty, validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { v4 } from "uuid";
import { UserController } from "../../controller/UserController";
import { generateEndpoint } from "../base/generateEndpoint";

export const save = generateEndpoint(async (request: Request) => {
  const input = new SaveUserInput();

  const id = v4();

  input.name = request.body.name;
  input.nickname = request.body.nickname;
  input.email = request.body.email;

  validateOrReject(input);

  const controller = new UserController();
  return controller.save(input);
});

export class SaveUserInput {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  nickname?: string;

  @IsString()
  @IsNotEmpty()
  email?: string;
}
