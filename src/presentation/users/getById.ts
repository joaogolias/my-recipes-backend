import { Request, Response } from "express";
import { UserController } from "../../controller/UserController";
import { IsString, IsNotEmpty, validateOrReject } from "class-validator";
import { generateEndpoint } from "../base/generateEndpoint";

export const getById = generateEndpoint(async (request: Request) => {
  const id = request.params.id;

  const input = new GetUserByIdInput();
  input.id = id;

  validateOrReject(input);

  const controller = new UserController();
  return controller.one(input.id);
});

export class GetUserByIdInput {
  @IsString()
  @IsNotEmpty()
  id?: string;
}
