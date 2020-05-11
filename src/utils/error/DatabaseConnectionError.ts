import { CustomError } from "./base/CustomError";
import { CustomErrorStatus } from "./base/CustomErrorStatus";

export class DatabaseConnectionError extends CustomError {
  constructor(devMessage: string) {
    super(
      CustomErrorStatus.GENERIC,
      devMessage,
      "An error occured in database connection"
    );
  }
}
