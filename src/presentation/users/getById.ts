import { Request, Response } from "express";
import { UserController } from "../../controller/UserController";
import { IsString, IsNotEmpty, validateOrReject } from "class-validator";

export const getById = async (request: Request, response: Response) => {
  const id = request.params.id;

  const input = new GetUserByIdInput();
  input.id = id;

  validateOrReject(input);

  const controller = new UserController();
  return controller.one(input.id);
};

export class GetUserByIdInput {
  @IsString()
  @IsNotEmpty()
  id?: string;
}
