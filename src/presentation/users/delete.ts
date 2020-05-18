import { Request, Response } from "express";
import { UserController } from "../../controller/UserController";
import { IsString, IsNotEmpty, validateOrReject } from "class-validator";
import { generateEndpoint } from "../base/generateEndpoint";

export const deleteUser = generateEndpoint(async (request: Request) => {
  const input = new DeleteUserInput();

  input.id = request.params.id;

  validateOrReject(input);

  const controller = new UserController();
  return controller.remove(input.id);
});

export class DeleteUserInput {
  @IsString()
  @IsNotEmpty()
  id?: string;
}
