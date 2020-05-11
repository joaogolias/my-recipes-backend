import { CustomErrorStatus } from "./CustomErrorStatus";

export abstract class CustomError extends Error {
  constructor(
    protected _statusCode: CustomErrorStatus,
    protected _devMessage: string,
    message: string
  ) {
    super(message);
  }

  get statusCode(): CustomErrorStatus {
    return this._statusCode;
  }

  get devMessage(): string {
    return this._devMessage;
  }
}
