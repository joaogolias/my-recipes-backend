import { Request, Response } from "express";
import { BaseDatabase } from "../../data/base/BaseDatabase";

export const generateEndpoint = (
  handler: (req: Request) => Promise<any>
) => async (req: Request, res: Response) => {
  try {
    const result = await handler(req);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.statusCode || 400).send({
      message: err.message,
      devMessage: err.devMessage || "Missing dev message",
    });
  }
  BaseDatabase.destroyConnection();
};
