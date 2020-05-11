import { CustomError } from "./base/CustomError";
import { CustomErrorStatus } from "./base/CustomErrorStatus";

export class InvalidInputError extends CustomError {
  constructor(devMessage: string) {
    super(CustomErrorStatus.INVALID_INPUT, devMessage, "Invalid input");
  }
}
