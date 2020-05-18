import { Request, Response } from "express";
import { UserController } from "../../controller/UserController";

export const all = async (_: Request, response: Response) => {
  const controller = new UserController();
  const users = await controller.all();
  return {
    users,
  };
};
