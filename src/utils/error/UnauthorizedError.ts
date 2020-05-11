import { CustomError } from "./base/CustomError";
import { CustomErrorStatus } from "./base/CustomErrorStatus";

export class UnauthorizedError extends CustomError {
  constructor(devMessage: string) {
    super(
      CustomErrorStatus.UNAUTHORIZED,
      devMessage,
      "You are not authorized to access this resource"
    );
  }
}
