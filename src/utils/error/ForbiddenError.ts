import { CustomError } from "./base/CustomError";
import { CustomErrorStatus } from "./base/CustomErrorStatus";

export class ForbiddenError extends CustomError {
  constructor(devMessage: string) {
    super(CustomErrorStatus.FORBIDDEN, devMessage, "You are forbidden");
  }
}
