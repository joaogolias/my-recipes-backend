import { Request, Response } from "express";
import { BaseDatabase } from "../../data/base/BaseDatabase";

export const generateEndpoint = (
  handler: (req: Request) => Promise<any>
) => async (req: Request, res: Response) => {
  try {
    console.log("asjido");
    const result = await handler(req);
    res.status(200).send(result);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.statusCode || 400).send({
      message: err.message,
      devMessage: err.devMessage || "Missing dev message",
    });
  }
  await BaseDatabase.destroyConnection();
};
