import { Request, Response } from "express";
import { UserController } from "../../controller/UserController";
import { IsString, IsNotEmpty, validateOrReject } from "class-validator";

export const deleteUser = async (request: Request, response: Response) => {
  const input = new DeleteUserInput();

  input.id = request.params.id;

  validateOrReject(input);

  const controller = new UserController();
  return controller.remove(input.id);
};

export class DeleteUserInput {
  @IsString()
  @IsNotEmpty()
  id?: string;
}
