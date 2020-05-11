import { CustomError } from "./base/CustomError";
import { CustomErrorStatus } from "./base/CustomErrorStatus";

export class NotFoundError extends CustomError {
  constructor(devMessage: string) {
    super(
      CustomErrorStatus.NOT_FOUND,
      devMessage,
      "Some information was not found"
    );
  }
}
