import { Request, Response } from "express";
import { UserController } from "../../controller/UserController";
import { generateEndpoint } from "../base/generateEndpoint";

export const all = generateEndpoint(async (_: Request) => {
  const controller = new UserController();
  const users = await controller.all();
  return {
    users,
  };
});
