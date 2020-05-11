import { Request, Response } from "express";

export const generateEndpoint = (
  usecase: (req: Request) => Promise<any>
) => async (req: Request, res: Response) => {
  try {
    const result = await usecase(req);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.statusCode || 400).send({
      message: err.message,
      devMessage: err.devMessage || "Missing dev message",
    });
  }
};
