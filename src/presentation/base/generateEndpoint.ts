import { Request, Response } from "express";

export const generateEndpoint = (
  endpoint: (req: Request) => Promise<any>
) => async (req: Request, res: Response) => {
  try {
    const result = await endpoint(req);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};
